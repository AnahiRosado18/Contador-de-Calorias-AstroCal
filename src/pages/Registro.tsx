// Importa hooks de React
import { useState, useEffect } from 'react';
// Importa hooks de React Router
import { useNavigate } from 'react-router-dom';
// Importa el contexto de autenticación
import { useAuth } from '@/contexts/AuthContext';
// Importa componentes de UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/ThemeToggle';
// Importa la función de cálculo de calorías
import { useCaloriesCalculator } from '@/hooks/useCalories';
// Importa librería de notificaciones
import { toast } from 'sonner';
// Importa icono
import { LogOut } from 'lucide-react';

export default function Registro() {
  // --- HOOKS ---
  // Obtiene el perfil actual y las funciones 'updateProfile' y 'logout'
  const { currentProfile, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  // --- ESTADO LOCAL ---
  // Un objeto de estado para manejar todos los campos del formulario.
  // Se inicializa con los datos del perfil si ya existen.
  const [formData, setFormData] = useState({
    sex: currentProfile?.sex || '',
    age: currentProfile?.age || '',
    weightKg: currentProfile?.weightKg || '',
    heightCm: currentProfile?.heightCm || '',
    activity: currentProfile?.activity || '',
  });

  // --- EFECTO SECUNDARIO (GUARD) ---
  // Se ejecuta al cargar el componente y si 'currentProfile' cambia.
  useEffect(() => {
    // Si no hay un perfil (nadie logueado), lo patea al login.
    if (!currentProfile) {
      navigate('/login');
    }
  }, [currentProfile, navigate]);

  // --- MANEJADORES DE EVENTOS ---
  /**
   * Manejador para el envío del formulario de registro de datos.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarga de página

    // Validación
    if (!formData.sex || !formData.age || !formData.weightKg || !formData.heightCm || !formData.activity) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Prepara los datos para actualizar, convirtiendo a 'number'
    const updates = {
      sex: formData.sex as 'male' | 'female',
      age: Number(formData.age),
      weightKg: Number(formData.weightKg),
      heightCm: Number(formData.heightCm),
      activity: formData.activity,
    };

    // Calcula el TDEE (calorías meta) usando el hook de cálculo
    // Pasa una combinación del perfil actual y los nuevos datos
    const { tdee } = useCaloriesCalculator({ ...currentProfile!, ...updates });
    
    // Llama a la función del AuthContext para guardar los datos
    updateProfile({ ...updates, tdee });

    toast.success('¡Perfil actualizado!');
    navigate('/dashboard'); // Redirige al dashboard
  };

  /**
   * Manejador para cerrar sesión.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Si el perfil aún no se ha cargado, no renderiza nada (evita flicker)
  if (!currentProfile) return null;

  // --- RENDERIZADO DEL COMPONENTE (JSX) ---
  const backgroundImageUrl = '/img/arreglo-de-la-piramide-alimenticia-real.jpg';

  return (
    <div className="relative min-h-screen">
      {/* Capa de Fondo (z-0) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      
      {/* Capa de Contenido (z-20) */}
      <div className="relative z-20">

        {/* Botones de la esquina (Tema y Logout) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Contenedor de Centrado */}
        <div className="min-h-screen flex items-center justify-center p-4">
        
          {/* Tarjeta de Registro con efecto vidrioso */}
          <Card className="w-full max-w-2xl p-8 shadow-[var(--shadow-brand)] border-primary/20 bg-card/80 backdrop-blur-md">
            
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Completa tu perfil
              </h1>
              <p className="text-muted-foreground mt-2">
                Necesitamos algunos datos para calcular tus calorías diarias
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid para inputs (2 columnas en desktop) */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Selector de Sexo */}
                <div className="space-y-2">
                  <Label htmlFor="sex">Sexo</Label>
                  {/* Componente Select controlado */}
                  <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                    <SelectTrigger id="sex">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input de Edad */}
                <div className="space-y-2">
                  <Label htmlFor="age">Edad (años)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="15"
                    max="100"
                    placeholder="25"
                    value={formData.age} // Controlado por el estado
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} // Actualiza el estado
                  />
                </div>

                {/* Input de Peso */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1" // Permite decimales
                    placeholder="70"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                  />
                </div>

                {/* Input de Altura */}
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    placeholder="170"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                  />
                </div>
              </div>

              {/* Selector de Nivel de Actividad (fuera del grid) */}
              <div className="space-y-2">
                <Label htmlFor="activity">Nivel de actividad</Label>
                <Select value={formData.activity} onValueChange={(value) => setFormData({ ...formData, activity: value })}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Selecciona tu nivel de actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentario (poco o ningún ejercicio)</SelectItem>
                    <SelectItem value="light">Ligero (ejercicio 1-3 días/semana)</SelectItem>
                    <SelectItem value="moderate">Moderado (ejercicio 3-5 días/semana)</SelectItem>
                    <SelectItem value="active">Activo (ejercicio 6-7 días/semana)</SelectItem>
                    <SelectItem value="very_active">Muy activo (ejercicio intenso diario)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[var(--shadow-brand)]"
              >
                Guardar y continuar
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}