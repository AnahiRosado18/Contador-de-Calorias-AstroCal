// Importa los componentes de notificación (Toast y Sonner)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// Importa el proveedor de Tooltip de shadcn/ui
import { TooltipProvider } from "@/components/ui/tooltip";
// Importa el proveedor de React Query (para fetching/caching de datos)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Importa los componentes de enrutamiento de react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Importa tus proveedores de contexto personalizados
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
// Importa las páginas (vistas)
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Historial from "./pages/Historial";
import NotFound from "./pages/NotFound"; // Página de error 404

// Crea una instancia de QueryClient para React Query
const queryClient = new QueryClient();

/**
 * Componente Raíz de la Aplicación.
 * Aquí se configuran los contextos y el enrutador.
 * El orden es importante: Los proveedores deben envolver al enrutador.
 */
const App = () => (
  // 1. Proveedor de React Query: Maneja el estado de los datos del servidor.
  <QueryClientProvider client={queryClient}>
    {/* 2. Proveedor de Tema: Maneja 'light'/'dark' mode. */}
    <ThemeProvider>
      {/* 3. Proveedor de Autenticación: Maneja el estado del 'currentProfile'. */}
      <AuthProvider>
        {/* 4. Proveedor de Tooltip: Habilita los tooltips en toda la app. */}
        <TooltipProvider>
          {/* Componentes de Notificaciones (se renderizan aquí pero se muestran como overlays) */}
          <Toaster />
          <Sonner />
          
          {/* 5. Enrutador (BrowserRouter): Habilita la navegación de URLs. */}
          <BrowserRouter>
            {/* 6. Contenedor de Rutas: Aquí se definen las páginas. */}
            <Routes>
              {/* Ruta Raíz ('/'): Redirige automáticamente a '/login'. */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Definición de todas las páginas de la app */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/historial" element={<Historial />} />
              
              {/* Ruta "Catch-all" ('*'): Si ninguna otra ruta coincide, muestra NotFound. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;