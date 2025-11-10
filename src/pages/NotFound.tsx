// Importa 'useLocation' para obtener información sobre la URL que falló
import { useLocation } from "react-router-dom";
// Importa 'useEffect' para ejecutar código con efectos secundarios (como logging)
import { useEffect } from "react";

const NotFound = () => {
  // Obtiene la información de la ubicación (URL) actual
  const location = useLocation();

  // Efecto secundario: Se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Registra un error en la consola del desarrollador
    // Esto es útil para depurar enlaces rotos
    console.error(
      "404 Error: User attempted to access non-existent route:", 
      location.pathname // 'pathname' es la URL que no se encontró (ej. /pagina-que-no-existe)
    );
  }, [location.pathname]); // Se ejecuta si la ruta cambia

  // --- RENDERIZADO DEL COMPONENTE (JSX) ---
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        {/* Un enlace simple para volver a la página de inicio */}
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;