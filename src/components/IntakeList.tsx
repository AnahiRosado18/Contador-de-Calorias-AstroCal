import { ScrollArea } from '@/components/ui/scroll-area';
import { IntakeItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react'; // Iconos

// Define las 'props' que espera este componente
interface IntakeListProps {
  items: IntakeItem[]; // La lista de alimentos consumidos
  onDecrease: (foodId: string) => void; // Función para restar/eliminar
  onIncrease: (foodId: string) => void; // Función para sumar
}

export function IntakeList({ items, onDecrease, onIncrease }: IntakeListProps) {

  // --- ESTADO VACÍO ---
  // Si la lista de 'items' está vacía, muestra un mensaje amigable.
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed border-2 border-primary/20">
        <p className="text-muted-foreground">
          Aún no has agregado alimentos. Busca y agrega para comenzar a registrar.
        </p>
      </Card>
    );
  }

  // --- ESTADO CON ITEMS ---
  // Usa el componente ScrollArea para que la lista no crezca indefinidamente.
  return (
    <ScrollArea className="h-[300px] w-full">
      {/* El 'pb-4' (padding-bottom) es un truco para que el último item
          no quede pegado al fondo y cortado por el scroll. */}
      <div className="space-y-2 pr-4 pb-4">
        {/* Itera sobre la lista de 'items' y renderiza una tarjeta por cada uno */}
        {items.map((item) => {
          // Calcula las calorías totales para este item (calorías * cantidad)
          const totalCalories = item.calories * item.quantity;
          
          return (
            <Card key={item.foodId} className="p-3 flex items-center justify-between border-primary/10">
              {/* Información del alimento (izquierda) */}
              <div className="flex-1 min-w-0"> 
                <h4 className="font-semibold text-foreground truncate">{item.foodName}</h4>
                <p className="text-xs text-muted-foreground">
                  {item.serving} (x{item.quantity}) • {totalCalories} kcal
                </p>
              </div>

              {/* Controles (derecha) */}
              <div className="flex items-center gap-1">
                {/* Botón de Restar/Eliminar */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDecrease(item.foodId)} // Llama a la prop
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                >
                  {/* Muestra un icono de basura si la cantidad es 1, o un 'menos' si es > 1 */}
                  {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </Button>

                {/* Contador de cantidad */}
                <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>

                {/* Botón de Sumar */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onIncrease(item.foodId)} // Llama a la prop
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
}