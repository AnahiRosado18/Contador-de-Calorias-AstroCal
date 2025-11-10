// Importa la función 'clsx' (para clases condicionales)
import { clsx, type ClassValue } from "clsx";
// Importa la función 'twMerge' (para fusionar clases de Tailwind)
import { twMerge } from "tailwind-merge";

/**
 * Función de utilidad 'cn' (abreviatura de "class names").
 *
 * Combina 'clsx' y 'twMerge' para permitirte escribir clases
 * de Tailwind de forma condicional sin conflictos.
 *
 * Ejemplo de 'clsx':
 * clsx("p-4", true && "bg-red-500", false && "bg-blue-500")
 * // -> "p-4 bg-red-500"
 *
 * Ejemplo de 'twMerge' (resuelve conflictos):
 * twMerge("p-4 bg-red-500", "p-2 bg-blue-500")
 * // -> "p-2 bg-blue-500" (p-2 sobreescribe p-4, bg-blue sobreescribe bg-red)
 *
 * @param inputs - Cualquier número de strings de clase, objetos o booleanos.
 * @returns Un string de clases de Tailwind optimizado y sin conflictos.
 */
export function cn(...inputs: ClassValue[]) {
  // 1. 'clsx' maneja la lógica condicional (objetos, booleanos)
  // 2. 'twMerge' limpia el resultado, resolviendo conflictos de Tailwind
  return twMerge(clsx(inputs));
}