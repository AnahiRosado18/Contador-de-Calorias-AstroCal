import * as React from "react";

// Define el punto de corte (breakpoint) para móvil
const MOBILE_BREAKPOINT = 768; // pixeles

/**
 * Hook que devuelve 'true' si el ancho de la ventana es menor
 * que el breakpoint de móvil, y 'false' si no.
 */
export function useIsMobile() {
  // 'undefined' al inicio para evitar problemas de hidratación (SSR)
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // 'window.matchMedia' es la API moderna del navegador para esto
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Función que se ejecuta cuando el estado cambia (ej. al rotar el teléfono)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Añade el "oyente" de cambios
    mql.addEventListener("change", onChange);
    
    // Comprueba el estado inicial al cargar
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Función de limpieza: se ejecuta al desmontar el componente
    return () => mql.removeEventListener("change", onChange);
  }, []); // El array vacío [] asegura que esto solo se ejecute al montar/desmontar

  return !!isMobile; // Convierte 'undefined' a 'false' en el primer render
}