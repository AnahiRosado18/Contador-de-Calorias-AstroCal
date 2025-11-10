import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { storage } from '@/utils/storage';
import { DayIntake } from '@/types';
import { ArrowLeft, LogOut } from 'lucide-react';
// Importa componentes de Recharts para los gráficos
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

export default function Historial() {
  // --- HOOKS ---
  const { currentProfile, logout } = useAuth();
  const { theme } = useTheme(); // Para ajustar colores del gráfico
  const navigate = useNavigate();
  
  // --- ESTADO LOCAL ---
  // Almacena los datos del historial
  const [history, setHistory] = useState<DayIntake[]>([]);

  // --- EFECTO SECUNDARIO ---
  useEffect(() => {
    // Guard: Redirige si no está logueado
    if (!currentProfile) {
      navigate('/login');
      return;
    }

    // Carga los datos del historial desde el storage
    const data = storage.getHistory(currentProfile.id);
    // .reverse() para mostrar los días más antiguos primero en los gráficos
    setHistory(data.reverse());
  }, [currentProfile, navigate]);

  /**
   * Manejador para cerrar sesión.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // No renderiza nada si el perfil no ha cargado
  if (!currentProfile) return null;

  // --- PREPARACIÓN DE DATOS PARA GRÁFICOS ---
  // Transforma los datos del historial al formato que espera Recharts
  const chartData = history.map(day => ({
    // Formatea la fecha (ej. "lun. 5")
    date: new Date(day.date).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' }),
    // Calorías consumidas ese día
    calories: day.totalCalories,
    // La meta del usuario (se repite para cada día)
    goal: currentProfile.tdee || 0,
  }));

  // Colores dinámicos para los gráficos basados en el tema (light/dark)
  const gridColor = theme === 'dark' ? 'hsl(260 20% 25%)' : 'hsl(260 20% 90%)';
  const textColor = theme === 'dark' ? 'hsl(0 0% 100%)' : 'hsl(260 20% 15%)';

  // --- RENDERIZADO ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Encabezado fijo */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Botón para volver al Dashboard */}
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Historial
              </h1>
              <p className="text-sm text-muted-foreground">Últimos 5 días</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Tarjeta del Gráfico de Barras */}
        <Card className="p-6 border-primary/20 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-bold mb-6">Consumo diario</h2>
          {/* Contenedor responsivo para el gráfico */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(260 28% 16%)' : 'hsl(0 0% 100%)',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                }}
              />
              {/* Barra de calorías consumidas */}
              <Bar dataKey="calories" fill="hsl(265 85% 58%)" radius={[8, 8, 0, 0]} />
              {/* Barra de la meta (con opacidad) */}
              <Bar dataKey="goal" fill="hsl(285 90% 68%)" radius={[8, 8, 0, 0]} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Tarjeta del Gráfico de Líneas */}
        <Card className="p-6 border-primary/20 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-bold mb-6">Tendencia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(260 28% 16%)' : 'hsl(0 0% 100%)',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                }}
              />
              {/* Línea de calorías consumidas */}
              <Line type="monotone" dataKey="calories" stroke="hsl(265 85% 58%)" strokeWidth={3} dot={{ fill: 'hsl(265 85% 58%)', r: 6 }} />
              {/* Línea de la meta (punteada) */}
              <Line type="monotone" dataKey="goal" stroke="hsl(285 90% 68%)" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Grid de Tarjetas de Resumen por Día */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* .reverse() aquí para mostrar Hoy primero en las tarjetas */}
          {history.reverse().map((day) => {
            const date = new Date(day.date);
            const isToday = day.date === new Date().toISOString().split('T')[0];
            const tdee = currentProfile.tdee || 0;
            const diff = day.totalCalories - tdee;
            
            // Suma el total de porciones (quantity) de todos los items de ese día
            const totalPorciones = day.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <Card key={day.date} className="p-4 border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">
                    {/* Muestra "Hoy" o el nombre del día */}
                    {isToday ? 'Hoy' : date.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric' })}
                  </h3>
                  {/* Muestra la diferencia de calorías (positiva, negativa o cero) */}
                  {diff > 0 ? (
                    <span className="text-sm text-destructive">+{diff}</span>
                  ) : diff < 0 ? (
                    <span className="text-sm text-muted-foreground">{diff}</span>
                  ) : (
                    <span className="text-sm text-success font-bold">0</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">{day.totalCalories}</span>
                  <span className="text-sm text-muted-foreground">/ {tdee} kcal</span>
                </div>
                
                {/* Muestra el total de porciones */}
                <p className="text-xs text-muted-foreground mt-2">
                  {totalPorciones} {totalPorciones === 1 ? 'porción' : 'porciones'}
                </p>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}