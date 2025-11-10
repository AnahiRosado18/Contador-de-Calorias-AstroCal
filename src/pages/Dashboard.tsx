import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
// Importa todos los componentes necesarios
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FoodCard } from '@/components/FoodCard';
import { IntakeList } from '@/components/IntakeList';
import { ProgressRing } from '@/components/ProgressRing';
import { MEXICAN_FOODS, FOOD_CATEGORIES } from '@/data/foods'; // Base de datos de alimentos
import { storage } from '@/utils/storage'; // Acceso al localStorage
import { Food, IntakeItem } from '@/types'; // Tipos de datos
import { LogOut, Search, RotateCcw, Download, Calendar, Flame } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf'; // Para exportar a PDF
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Dashboard() {
  // --- HOOKS DE CONTEXTO Y NAVEGACIÓN ---
  const { currentProfile, logout } = useAuth();
  const navigate = useNavigate();

  // --- ESTADO LOCAL ---
  // Estado para los filtros de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [calorieFilterMin, setCalorieFilterMin] = useState('');
  const [calorieFilterMax, setCalorieFilterMax] = useState('');
  
  // Estado para la lista de alimentos consumidos HOY
  const [todayIntake, setTodayIntake] = useState<IntakeItem[]>([]);
  
  // Obtiene la fecha de hoy en formato 'YYYY-MM-DD'
  const todayDate = new Date().toISOString().split('T')[0];

  // --- EFECTOS SECUNDARIOS (useEffect) ---
  useEffect(() => {
    // 1. Redirección si no está logueado
    if (!currentProfile) {
      navigate('/login');
      return;
    }
    // 2. Redirección si no ha completado el registro (no tiene TDEE)
    if (!currentProfile.tdee) {
      navigate('/registro');
      return;
    }
    // 3. Cargar la ingesta de hoy desde el storage
    const intake = storage.getDayIntake(currentProfile.id, todayDate);
    setTodayIntake(intake.items);
  }, [currentProfile, navigate, todayDate]); // Se ejecuta si cualquiera de estos cambia

  // --- CÁLCULOS MEMORIZADOS (useMemo) ---
  /**
   * Filtra la base de datos de alimentos (MEXICAN_FOODS) basado en los estados de los filtros.
   * Se recalcula solo si los filtros (searchQuery, selectedCategory, etc.) cambian.
   */
  const filteredFoods = useMemo(() => {
    const minCalories = parseInt(calorieFilterMin, 10);
    const maxCalories = parseInt(calorieFilterMax, 10);

    return MEXICAN_FOODS.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || food.category === selectedCategory;
      const foodCalories = food.calories; 
      const matchesMin = isNaN(minCalories) || minCalories <= 0 || foodCalories >= minCalories;
      const matchesMax = isNaN(maxCalories) || maxCalories <= 0 || foodCalories <= maxCalories;
      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });
  }, [searchQuery, selectedCategory, calorieFilterMin, calorieFilterMax]);

  /**
   * Calcula el total de calorías consumidas hoy.
   * Se recalcula solo si 'todayIntake' cambia.
   */
  const totalCalories = useMemo(() => {
    return todayIntake.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  }, [todayIntake]);

  // --- LÓGICA DE NOTIFICACIÓN DE META (useRef) ---
  // 'useRef' se usa para guardar un valor que persiste entre renders PERO no causa un re-render al cambiar.
  const prevTotalCaloriesRef = useRef<number>();

  useEffect(() => {
    const tdee = currentProfile?.tdee || 0;
    // Si es el primer render, solo guarda el valor y sale
    if (prevTotalCaloriesRef.current === undefined) {
      prevTotalCaloriesRef.current = totalCalories;
      return;
    }
    // Si las calorías actuales alcanzan la meta Y las calorías anteriores eran diferentes
    if (totalCalories === tdee && prevTotalCaloriesRef.current !== tdee) {
      toast.success("¡Felicidades! ¡Alcanzaste tu meta exacta!", {
        duration: 5000,
        icon: '🎉',
      });
    }
    // Actualiza el valor de referencia para el próximo cambio
    prevTotalCaloriesRef.current = totalCalories;
  }, [totalCalories, currentProfile]); // Se ejecuta cada vez que 'totalCalories' cambia

  // --- MANEJADORES DE EVENTOS ---

  /**
   * Función centralizada para actualizar el estado Y el localStorage.
   */
  const updateAndSaveIntake = (updatedIntake: IntakeItem[]) => {
    // Calcula el nuevo total de calorías
    const newTotalCalories = updatedIntake.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    // Actualiza el estado de React (dispara re-render)
    setTodayIntake(updatedIntake);
    // Guarda en el localStorage
    storage.saveDayIntake(currentProfile!.id, {
      date: todayDate,
      items: updatedIntake,
      totalCalories: newTotalCalories,
    });
  };

  /**
   * Incrementa la cantidad de un alimento en la lista 'todayIntake'.
   */
  const handleIncrease = (foodId: string) => {
    const updated = todayIntake.map(item =>
      item.foodId === foodId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateAndSaveIntake(updated);
  };

  /**
   * Decrementa la cantidad o elimina un alimento de 'todayIntake'.
   */
  const handleDecrease = (foodId: string) => {
    const itemToDecrease = todayIntake.find(item => item.foodId === foodId);
    let updated = [];
    
    // Si la cantidad es 1, eliminar el item
    if (itemToDecrease && itemToDecrease.quantity === 1) {
      updated = todayIntake.filter(item => item.foodId !== foodId);
      toast.success(`${itemToDecrease.foodName} eliminado`);
    } else {
      // Si es > 1, solo resta 1
      updated = todayIntake.map(item =>
        item.foodId === foodId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
    }
    updateAndSaveIntake(updated);
  };

  /**
   * Añade un nuevo alimento a 'todayIntake' o incrementa si ya existe.
   */
  const handleAddFood = (food: Food) => {
    const existingItem = todayIntake.find(item => item.foodId === food.id);
    
    if (existingItem) {
      // Si ya existe, solo incrementa
      handleIncrease(food.id);
      toast.success(`${food.name} (+1 porción)`);
    } else {
      // Si es nuevo, lo añade a la lista con cantidad 1
      const newItem: IntakeItem = {
        foodId: food.id,
        foodName: food.name,
        calories: food.calories,
        serving: food.serving,
        quantity: 1,
        timestamp: new Date().toISOString(),
      };
      updateAndSaveIntake([...todayIntake, newItem]);
      toast.success(`${food.name} agregado (${food.calories} kcal)`);
    }
  };
  
  /**
   * Reinicia la lista de alimentos de hoy a cero.
   */
  const handleReset = () => {
    updateAndSaveIntake([]);
    toast.success('Día reiniciado');
  };

  /**
   * Genera y descarga un PDF con el resumen del día.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tdee = currentProfile?.tdee || 0;
    
    // Configuración y contenido del PDF
    doc.setFontSize(20);
    doc.text('Reporte Diario de Calorías', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 20, 35);
    doc.text(`Usuario: ${currentProfile?.name}`, 20, 45);
    doc.text(`Meta diaria: ${tdee} kcal`, 20, 55);
    doc.text(`Consumido: ${totalCalories} kcal`, 20, 65);
    doc.text(`Diferencia: ${totalCalories - tdee} kcal`, 20, 75);
    doc.text('Alimentos consumidos:', 20, 90);
    
    let y = 100; // Posición vertical inicial para la lista
    todayIntake.forEach((item, i) => {
      const totalCalories = item.calories * item.quantity;
      doc.text(`${i + 1}. ${item.foodName} (x${item.quantity}) - ${item.serving} - ${totalCalories} kcal`, 25, y);
      y += 10; // Siguiente línea
    });
    
    doc.save(`reporte-${todayDate}.pdf`); // Descarga el archivo
    toast.success('PDF exportado');
  };

  /**
   * Cierra sesión y redirige al login.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- RENDERIZADO ---
  if (!currentProfile) return null; // Guard para evitar render sin perfil

  const tdee = currentProfile.tdee || 0;
  const remaining = tdee - totalCalories;
  const backgroundImageUrl = '/img/arreglo-de-la-piramide-alimenticia-real.jpg';

  return (
    // Contenedor principal con fondo
    <div className="relative min-h-screen">
      {/* Capa de Fondo (Imagen) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      {/* Capa de Superposición (Gradiente) */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-primary/70 to-secondary/50" 
      />

      {/* Capa de Contenido */}
      <div className="relative z-20 min-h-screen">
        
        {/* Encabezado fijo (sticky) con efecto blur */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-2">
            <div className="flex-shrink min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                Hola, {currentProfile.name}
              </h1>
              <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text">
                {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            {/* Botones de acción del header */}
            <div className="flex flex-shrink-0 gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate('/historial')} className="rounded-full">
                <Calendar className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Contenido principal (Layout de 1 o 3 columnas) */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda (Progreso e Ingesta) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Tarjeta de Progreso */}
              <Card className="p-6 border-primary/20 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">Tu progreso hoy</h2>
                <div className="mb-6">
                  {/* Círculo de progreso */}
                  <ProgressRing current={totalCalories} goal={tdee} />
                </div>
                {/* Mensajes condicionales según las calorías restantes */}
                {remaining > 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    Vas excelente. Te faltan <span className="font-bold text-primary">{remaining} kcal</span> para tu meta.
                  </p>
                ) : remaining < 0 ? (
                  <p className="text-center text-sm text-destructive">
                    Te pasaste por <span className="font-bold">{Math.abs(remaining)} kcal</span>. Mañana será mejor 🙂
                  </p>
                ) : (
                  <p className="text-center text-sm text-success font-bold">
                    ¡Felicidades! Has alcanzado tu meta exacta de {tdee} kcal.
                  </p>
                )}
              </Card>

              {/* Tarjeta de Alimentos de Hoy */}
              <Card className="p-6 border-primary/20 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Alimentos de hoy</h2>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExportPDF}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Lista de alimentos consumidos */}
                <IntakeList 
                  items={todayIntake} 
                  onDecrease={handleDecrease} 
                  onIncrease={handleIncrease} 
                />
              </Card>
            </div>

            {/* Columna Derecha (Buscador y Resultados) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tarjeta de Filtros de Búsqueda */}
              <Card className="p-6 border-primary/20 shadow-[var(--shadow-card)] bg-card/80 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4">Buscar alimentos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Input de Búsqueda por Nombre */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Selector de Categoría */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOOD_CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Filtros de Calorías (Min y Max) */}
                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">
                    <div className="relative flex-1">
                      <Flame className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Cal. Mín."
                        value={calorieFilterMin}
                        onChange={(e) => setCalorieFilterMin(e.target.value)}
                        className="pl-10"
                        min="0"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Flame className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Cal. Máx."
                        value={calorieFilterMax}
                        onChange={(e) => setCalorieFilterMax(e.target.value)}
                        className="pl-10"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Área de Resultados de Búsqueda (con Scroll) */}
              <ScrollArea className="h-[725px] w-full">
                {/* Renderizado condicional: muestra resultados o mensaje de "no encontrado" */}
                {filteredFoods.length > 0 ? (
                  // Grid para las tarjetas de alimentos
                  <div className="grid sm:grid-cols-2 gap-4 pr-4 pb-4">
                    {filteredFoods.map(food => (
                      <FoodCard key={food.id} food={food} onAdd={handleAddFood} />
                    ))}
                  </div>
                ) : (
                  // Mensaje de "No se encontraron"
                  <Card className="p-8 text-center border-dashed border-2 border-primary/20 bg-card/80 backdrop-blur-sm mr-4 mb-4">
                    <p className="text-muted-foreground">
                      No se encontraron alimentos. Intenta con otra búsqueda o filtro.
                    </p>
                  </Card>
                )}
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}