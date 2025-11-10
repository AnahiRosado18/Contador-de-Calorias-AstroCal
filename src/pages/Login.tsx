// Importa el hook 'useState' de React para manejar el estado del formulario
import { useState } from 'react';
// Importa el hook 'useNavigate' para redirigir al usuario
import { useNavigate } from 'react-router-dom';
// Importa el hook de autenticación personalizado
import { useAuth } from '@/contexts/AuthContext';
// Importa componentes de UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';
// Importa iconos
import { Lock, User } from 'lucide-react';
// Importa la librería de notificaciones
import { toast } from 'sonner';

export default function Login() {
  // --- ESTADO LOCAL ---
  // Guarda el valor del campo de usuario
  const [username, setUsername] = useState('');
  // Guarda el valor del campo de contraseña
  const [password, setPassword] = useState('');
  // Controla si se está procesando la solicitud (para deshabilitar el botón)
  const [isLoading, setIsLoading] = useState(false);
  
  // --- HOOKS ---
  // Obtiene las funciones 'login' y 'register' de nuestro AuthContext
  const { login, register } = useAuth();
  // Obtiene la función 'navigate' para redirigir al usuario
  const navigate = useNavigate();

  /**
   * Manejador para el envío del formulario.
   * Se ejecuta cuando el usuario presiona el botón "Entrar".
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Validación simple
    if (!username.trim() || !password.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true); // Inicia la carga

    try {
      // 1. Intenta hacer login
      const loginSuccess = await login(username, password);
      
      if (loginSuccess) {
        toast.success(`¡Bienvenido de nuevo, ${username}!`);
        // Si el login es exitoso, lo manda a '/registro' (para completar datos)
        navigate('/registro'); 
        return;
      }

      // 2. Si el login falla (usuario no existe), intenta registrarlo
      const registerSuccess = await register(username, password);
      
      if (registerSuccess) {
        toast.success(`¡Cuenta creada! Bienvenido, ${username}`);
        // Si el registro es exitoso, lo manda a '/registro'
        navigate('/registro');
      } else {
        // Si el registro falla (raro, pero puede ser) o el login falló por contraseña incorrecta
        toast.error('Nombre o contraseña incorrectos');
      }
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    } finally {
      setIsLoading(false); // Detiene la carga, sin importar si hubo éxito o error
    }
  };

  // --- RENDERIZADO ---
  const backgroundImageUrl = '/img/arreglo-de-la-piramide-alimenticia-real.jpg';
  const logoUrl = '/img/logo.png';

  return (
    // Contenedor principal con imagen de fondo
    <div className="relative min-h-screen">

      {/* Capa de fondo (z-0) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      
      {/* Capa de Contenido (z-20) */}
      <div className="relative z-20">

        {/* Botón de Tema en la esquina */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        {/* Contenedor para centrar la tarjeta */}
        <div className="min-h-screen flex items-center justify-center p-4">
          {/* Tarjeta con efecto "glassmorphism" (backdrop-blur) */}
          <Card className="w-full max-w-md p-8 shadow-[var(--shadow-brand)] border-primary/20 bg-card/80 backdrop-blur-md">
            
            <div className="text-center mb-8">
              {/* Logo e Info de la App */}
              <img 
                src={logoUrl} 
                alt="AstroCal Logo" 
                className="w-24 h-auto mx-auto mb-4" 
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AstroCal
              </h1>              
              <h2 className=" font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Contador de Calorías
              </h2>
              <p className="text-muted-foreground mt-2">
                Ingresar usuario o crear usuario
              </p>
            </div>

            {/* Formulario de Login/Registro */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <div className="relative">
                  {/* Icono dentro del input */}
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu nombre"
                    value={username} // Controlado por el estado
                    onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
                    className="pl-10" // Padding izquierdo para el icono
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={password} // Controlado por el estado
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                    className="pl-10"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-[var(--shadow-brand)]"
                disabled={isLoading} // Deshabilitado mientras carga
              >
                {isLoading ? 'Procesando...' : 'Entrar o crear cuenta'}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Si el usuario no existe, se creará automáticamente
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}