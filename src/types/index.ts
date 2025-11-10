/**
 * Define la estructura de un perfil de usuario.
 * Esto es lo que se guarda para cada usuario.
 */
export interface Profile {
  id: string; // ID único
  name: string; // Nombre de usuario
  passwordHash: string; // Hash de la contraseña
  sex?: 'male' | 'female'; // Opcional
  age?: number; // Opcional
  weightKg?: number; // Opcional
  heightCm?: number; // Opcional
  activity?: string; // Opcional
  tdee?: number; // Meta de calorías (opcional, se calcula)
  createdAt: string; // Fecha de creación
}

/**
 * Define la estructura de un alimento "Equivalente"
 * de la base de datos (ej. src/data/foods.ts).
 */
export interface Food {
  id: string;
  name: string;
  category: string;
  calories: number; // Calorías fijas por porción
  serving: string;  // Descripción de la porción (ej. "1 pieza")
}

/**
 * Define un item en la lista de ingesta del usuario (ej. en el Dashboard).
 * Es similar a 'Food', pero con 'quantity'.
 */
export interface IntakeItem {
  foodId: string; // ID que lo vincula al 'Food' original
  foodName: string;
  calories: number; // Calorías por 1 porción
  serving: string;  // Descripción de 1 porción
  quantity: number; // Cuántas porciones se han comido
  timestamp: string; // Cuándo se añadió
}

/**
 * Define la estructura de un día de ingesta,
 * que es lo que se guarda en el historial.
 */
export interface DayIntake {
  date: string; // 'YYYY-MM-DD'
  items: IntakeItem[]; // Lista de alimentos de ese día
  totalCalories: number; // Total de calorías de ese día
}

// --- TIPOS Y CONSTANTES PARA EL CÁLCULO DE CALORÍAS ---

// Tipo para los niveles de actividad (usado en el <Select> de Registro)
export type ActivityLevel = 
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

// Objeto que mapea cada nivel de actividad a su factor multiplicador
// Usado en 'useCalories.ts' para calcular el TDEE.
export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};