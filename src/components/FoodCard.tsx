import { Food } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Define las 'props' que espera este componente
interface FoodCardProps {
  food: Food; // El objeto completo del alimento a mostrar
  onAdd: (food: Food) => void; // La función a ejecutar cuando se hace clic en '+'
}

export function FoodCard({ food, onAdd }: FoodCardProps) {
  
  // Es un componente "tonto" (dumb component): solo recibe datos (props) y los muestra.
  // No tiene estado propio.
  return (
    // Tarjeta compacta
    <Card className="p-3 hover:shadow-[var(--shadow-card)] transition-shadow border-primary/10">
      <div className="flex items-start justify-between gap-3">
        {/* Sección de Información (izquierda) */}
        <div className="flex-1 min-w-0"> {/* min-w-0 es clave para que 'truncate' funcione */}
          <h3 className="font-semibold text-foreground truncate">{food.name}</h3>
          <p className="text-sm text-muted-foreground">{food.category}</p>
          {/* Info de Calorías */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">{food.calories}</span>
            <span className="text-sm text-muted-foreground">kcal</span>
          </div>
          {/* Info de Porción */}
          <p className="text-xs text-muted-foreground mt-1">
            Porción: {food.serving}
          </p>
        </div>
        
        {/* Botón de Añadir (derecha) */}
        <Button
          size="icon"
          onClick={() => onAdd(food)} // Llama a la función 'onAdd' recibida por props
          className="shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[var(--shadow-brand)]"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}