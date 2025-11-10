import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Estilos de la librería
import { useTheme } from '@/contexts/ThemeContext'; // Para saber si es modo claro u oscuro

// Define las 'props' que espera
interface ProgressRingProps {
  current: number; // Calorías consumidas
  goal: number;    // Meta de calorías
}

export function ProgressRing({ current, goal }: ProgressRingProps) {
  const { theme } = useTheme(); // Obtiene el tema actual
  
  // Calcula el porcentaje, asegurándose de no dividir por cero y no pasar de 100%
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  
  // --- LÓGICA DE ESTADO ---
  const isOverGoal = current > goal;
  const isUnderGoal = current < goal;
  const isExactGoal = current === goal && goal > 0;

  // Calcula las calorías restantes o sobrantes
  const remaining = Math.abs(goal - current);
  
  return (
    // Contenedor relativo para superponer el texto sobre el círculo
    <div className="relative w-full max-w-xs mx-auto">
      {/* El componente del Círculo de Progreso */}
      <CircularProgressbar
        value={percentage} // El porcentaje a rellenar
        text="" // El texto se pone manualmente en el 'div' superpuesto
        styles={buildStyles({
          // --- LÓGICA DE COLOR DINÁMICO ---
          // El color de la barra cambia según el estado
          pathColor: isOverGoal 
            ? 'hsl(0 85% 60%)'     // Rojo (Destructive) si se pasa
            : isExactGoal 
              ? 'hsl(145 70% 45%)' // Verde (Success) si es exacto
              : 'hsl(265 85% 58%)',  // Morado (Primary) por defecto
          
          // El color del "camino" (trail) depende del tema
          trailColor: theme === 'dark' ? 'hsl(260 20% 25%)' : 'hsl(260 10% 96%)',
          pathTransitionDuration: 0.5, // Animación suave
        })}
      />
      {/* Contenido superpuesto (texto) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          {/* Calorías actuales (grandes) */}
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {current}
          </div>
          {/* Meta de calorías */}
          <div className="text-sm text-muted-foreground">de {goal} kcal</div>
          
          {/* Mensaje condicional (faltan, sobran, meta) */}
          {isUnderGoal && (
            <div className="text-xs text-muted-foreground mt-1">
              Faltan {remaining} kcal
            </div>
          )}
          
          {isOverGoal && (
            <div className="text-xs text-destructive mt-1">
              +{remaining} kcal
            </div>
          )}

          {isExactGoal && (
             <div className="text-xs text-success font-bold mt-1">
              ¡Meta alcanzada!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}