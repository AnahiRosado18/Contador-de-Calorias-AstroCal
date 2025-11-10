// Importa tipos y funciones de React
import React, { createContext, useContext, useState, useEffect } from 'react';
// Importa la utilidad de almacenamiento (localStorage)
import { storage } from '@/utils/storage';

// Define el tipo 'Theme' como 'light' o 'dark'
type Theme = 'light' | 'dark';

// Define la "forma" de los datos que proveerá este contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void; // Una función para cambiar el tema
}

// Crea el Contexto de React
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Componente Proveedor que envuelve la aplicación
 * y provee el estado del tema.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // --- ESTADO INTERNO DEL PROVEEDOR ---
  
  // Inicializa el estado usando 'storage.getTheme()'
  // La función '() => ...' asegura que esto solo se ejecute UNA VEZ al inicio
  const [theme, setTheme] = useState<Theme>(() => storage.getTheme());

  // --- EFECTO SECUNDARIO ---
  
  // Este efecto se ejecuta CADA VEZ que el estado 'theme' cambia
  useEffect(() => {
    const root = document.documentElement; // Obtiene la etiqueta <html>
    
    // 1. Efecto en el DOM:
    // Limpia las clases anteriores
    root.classList.remove('light', 'dark');
    // Añade la clase actual (ej. <html class="dark">)
    // Esto activa las variables CSS de Tailwind en index.css
    root.classList.add(theme);
    
    // 2. Efecto en el Storage:
    // Guarda la nueva preferencia de tema en localStorage
    storage.setTheme(theme);
  }, [theme]); // Dependencia del efecto: 'theme'

  // --- FUNCIONES ---
  
  /**
   * Cambia el tema de 'light' a 'dark' o viceversa.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // --- PROVEEDOR JSX ---
  // Provee el estado 'theme' y la función 'toggleTheme' a todos sus hijos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook personalizado para consumir el contexto fácilmente.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}