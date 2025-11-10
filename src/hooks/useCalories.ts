// Importa los tipos de datos necesarios
import { Profile, ACTIVITY_FACTORS, ActivityLevel } from '@/types';

// Define la "forma" del objeto que devolverá el hook
interface CaloriesResult {
  bmr: number; // Tasa Metabólica Basal (Calorías en reposo)
  tdee: number; // Gasto Energético Diario Total (Calorías con actividad)
}

/**
 * Hook personalizado (en este caso, una función de utilidad) para calcular BMR y TDEE.
 * * NOTA: Aunque se llama 'useCaloriesCalculator', no es un hook de React (como useState o useEffect)
 * porque no utiliza estado ni ciclo de vida. Es una función de cálculo pura.
 * * Se basa en la Ecuación de Mifflin-St Jeor:
 * Hombres: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) + 5
 * Mujeres: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) - 161
 */
export function useCaloriesCalculator(profile: Profile): CaloriesResult {
  // Cláusula de guarda: si falta algún dato esencial, retorna 0
  if (!profile.weightKg || !profile.heightCm || !profile.age || !profile.sex) {
    return { bmr: 0, tdee: 0 };
  }

  // Desestructura los valores del perfil para un código más limpio
  const { weightKg, heightCm, age, sex, activity } = profile;
  
  // 1. Cálculo de BMR (Tasa Metabólica Basal)
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  // Ajuste final basado en el sexo
  bmr += sex === 'male' ? 5 : -161;

  // 2. Cálculo de TDEE (Gasto Energético Diario Total)
  // Obtiene el factor de actividad (ej. 1.2 para sedentario) del objeto ACTIVITY_FACTORS
  const activityFactor = ACTIVITY_FACTORS[activity as ActivityLevel] || 1.2; // 1.2 como fallback
  // TDEE = BMR * Factor de Actividad
  const tdee = Math.round(bmr * activityFactor);

  // Devuelve los valores redondeados
  return { bmr: Math.round(bmr), tdee };
}