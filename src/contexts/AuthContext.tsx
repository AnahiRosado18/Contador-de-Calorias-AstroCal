// Importa tipos y funciones de React
import React, { createContext, useContext, useState, useEffect } from 'react';
// Importa el tipo de dato del Perfil
import { Profile } from '@/types';
// Importa la utilidad de almacenamiento (localStorage)
import { storage } from '@/utils/storage';
// Importa las utilidades de criptografía (hashing)
import { hashPassword, verifyPassword } from '@/utils/crypto';

// --- DEFINICIÓN DE TIPOS ---
// Define la "forma" de los datos que proveerá este contexto
interface AuthContextType {
  currentProfile: Profile | null; // El perfil del usuario logueado
  login: (username: string, password: string) => Promise<boolean>; // Función de login
  register: (username: string, password: string) => Promise<boolean>; // Función de registro
  logout: () => void; // Función de logout
  updateProfile: (updates: Partial<Profile>) => void; // Función para actualizar el perfil
  isLoading: boolean; // Indicador de carga (ej. al inicio)
}

// Crea el Contexto de React. Se inicializa como 'undefined'.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- COMPONENTE PROVEEDOR (PROVIDER) ---
/**
 * Este componente envuelve a las partes de la app que necesitan
 * acceso al estado de autenticación.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // --- ESTADO INTERNO DEL PROVEEDOR ---
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- EFECTOS SECUNDARIOS ---
  // Este efecto se ejecuta UNA VEZ al cargar el componente (note el array vacío [])
  useEffect(() => {
    // Comprueba si hay una sesión activa guardada en el localStorage
    const activeId = storage.getActiveProfileId();
    if (activeId) {
      // Si la hay, obtiene los datos del perfil desde el localStorage
      const profile = storage.getProfile(activeId);
      if (profile) {
        // Y los establece como el perfil actual en el estado de React
        setCurrentProfile(profile);
      }
    }
    // Termina el estado de carga
    setIsLoading(false);
  }, []);

  // --- FUNCIONES DE AUTENTICACIÓN ---

  /**
   * Intenta loguear a un usuario.
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    const profiles = storage.getProfiles(); // Obtiene todos los perfiles de localStorage
    // Busca un perfil que coincida con el nombre de usuario (ignorando mayúsculas)
    const profile = profiles.find(p => p.name.toLowerCase() === username.toLowerCase());

    // Si no existe el perfil, retorna falso
    if (!profile) {
      return false;
    }

    // Verifica la contraseña hasheada (¡Lógica de cliente, solo para demo!)
    const isValid = await verifyPassword(password, profile.passwordHash);
    if (isValid) {
      // Si es válida, guarda el ID en sesión (localStorage)
      storage.setActiveProfileId(profile.id);
      // Establece el perfil en el estado de React
      setCurrentProfile(profile);
      return true; // Éxito
    }

    return false; // Contraseña incorrecta
  };

  /**
   * Registra un nuevo usuario.
   */
  const register = async (username: string, password: string): Promise<boolean> => {
    const profiles = storage.getProfiles(); // Obtiene todos los perfiles
    // Verifica si el nombre de usuario ya existe
    const exists = profiles.some(p => p.name.toLowerCase() === username.toLowerCase());

    if (exists) {
      return false; // Si existe, no se puede registrar
    }

    // Crea el hash de la contraseña (¡Lógica de cliente, solo para demo!)
    const passwordHash = await hashPassword(password);
    
    // Crea el nuevo objeto de perfil
    const newProfile: Profile = {
      id: crypto.randomUUID(), // Genera un ID único
      name: username,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    // Guarda el nuevo perfil en localStorage
    storage.addProfile(newProfile);
    // Establece este nuevo perfil como la sesión activa
    storage.setActiveProfileId(newProfile.id);
    setCurrentProfile(newProfile);
    return true; // Éxito
  };

  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    storage.clearActiveProfileId(); // Limpia la sesión de localStorage
    setCurrentProfile(null); // Limpia el estado de React
  };

  /**
   * Actualiza los datos del perfil actual.
   */
  const updateProfile = (updates: Partial<Profile>) => {
    if (!currentProfile) return; // No hacer nada si no hay usuario
    
    // Combina el perfil actual con las actualizaciones
    const updated = { ...currentProfile, ...updates };
    // Guarda las actualizaciones en localStorage
    storage.updateProfile(currentProfile.id, updates);
    // Actualiza el estado de React
    setCurrentProfile(updated);
  };

  // --- PROVEEDOR JSX ---
  // Retorna el componente Provider con el 'value' que contiene
  // el estado (profile, isLoading) y las funciones (login, register, etc.)
  return (
    <AuthContext.Provider value={{ currentProfile, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- HOOK PERSONALIZADO ---
/**
 * Un hook simple para consumir el AuthContext fácilmente
 * desde cualquier componente hijo.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Si se usa fuera del Provider, lanza un error
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}