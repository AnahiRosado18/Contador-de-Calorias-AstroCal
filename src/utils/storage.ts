// Importa los tipos de datos (Interfaces)
import { Profile, DayIntake } from '@/types';

// Define claves constantes para usar en el localStorage.
// Esto evita errores de tipeo (ej. 'cc_profiles' vs 'cc_profile')
const KEYS = {
  PROFILES: 'cc_profiles', // Clave para guardar TODOS los perfiles
  ACTIVE_PROFILE: 'cc_activeProfileId', // Clave para guardar el ID del usuario logueado
  THEME: 'cc_theme', // Clave para guardar 'light' o 'dark'
};

/**
 * Objeto 'storage'
 * * Este es un "wrapper" o "fachada" para el API de localStorage del navegador.
 * Centraliza toda la lógica de leer (getItem) y escribir (setItem) en un solo lugar.
 * También maneja la conversión de/hacia JSON (JSON.parse, JSON.stringify).
 */
export const storage = {
  // --- Métodos de Perfiles (Profiles) ---

  /**
   * Obtiene todos los perfiles guardados.
   * @returns Un array de objetos Profile. Retorna un array vacío si no hay nada.
   */
  getProfiles(): Profile[] {
    const data = localStorage.getItem(KEYS.PROFILES);
    return data ? JSON.parse(data) : []; // Parsea el JSON o retorna []
  },

  /**
   * Guarda un array completo de perfiles, sobreescribiendo el anterior.
   * @param profiles - El array de perfiles a guardar.
   */
  saveProfiles(profiles: Profile[]): void {
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
  },

  /**
   * Añade un nuevo perfil al array existente.
   * @param profile - El nuevo perfil a añadir.
   */
  addProfile(profile: Profile): void {
    const profiles = this.getProfiles(); // Lee el array actual
    profiles.push(profile); // Añade el nuevo
    this.saveProfiles(profiles); // Guarda el array modificado
  },

  /**
   * Actualiza un perfil existente basado en su ID.
   * @param id - El ID del perfil a actualizar.
   * @param updates - Un objeto con los campos a actualizar (Partial<Profile>).
   */
  updateProfile(id: string, updates: Partial<Profile>): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === id); // Encuentra el índice del perfil
    if (index !== -1) {
      // Si lo encuentra, fusiona el perfil antiguo con las actualizaciones
      profiles[index] = { ...profiles[index], ...updates };
      this.saveProfiles(profiles); // Guarda el array modificado
    }
  },

  /**
   * Obtiene un perfil específico por su ID.
   * @param id - El ID del perfil a buscar.
   * @returns El objeto Profile, o null si no se encuentra.
   */
  getProfile(id: string): Profile | null {
    const profiles = this.getProfiles();
    return profiles.find(p => p.id === id) || null;
  },

  // --- Métodos de Perfil Activo (Sesión) ---

  /**
   * Obtiene el ID del perfil activo (sesión actual).
   * @returns El string del ID, o null si no hay sesión.
   */
  getActiveProfileId(): string | null {
    return localStorage.getItem(KEYS.ACTIVE_PROFILE);
  },

  /**
   * Establece el ID del perfil activo (iniciar sesión).
   * @param id - El ID del usuario que ha iniciado sesión.
   */
  setActiveProfileId(id: string): void {
    localStorage.setItem(KEYS.ACTIVE_PROFILE, id);
  },

  /**
   * Limpia el ID del perfil activo (cerrar sesión).
   */
  clearActiveProfileId(): void {
    localStorage.removeItem(KEYS.ACTIVE_PROFILE);
  },

  // --- Métodos de Tema (Theme) ---

  /**
   * Obtiene el tema guardado ('light' o 'dark').
   * Si no hay nada guardado, detecta la preferencia del sistema operativo.
   * @returns 'light' | 'dark'
   */
  getTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem(KEYS.THEME);
    if (theme === 'dark' || theme === 'light') return theme; // Retorna el tema guardado
    // Si no hay, detecta la preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  /**
   * Guarda el tema seleccionado.
   * @param theme - 'light' o 'dark'
   */
  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(KEYS.THEME, theme);
  },

  // --- Métodos de Ingesta Diaria (Daily Intake) ---

  /**
   * Obtiene la ingesta de un día específico para un perfil específico.
   * @param profileId - ID del usuario.
   * @param date - La fecha en formato 'YYYY-MM-DD'.
   * @returns El objeto DayIntake. Retorna uno vacío si no hay nada.
   */
  getDayIntake(profileId: string, date: string): DayIntake {
    // La clave es dinámica, ej: "cc_intake_USER_ID_2023-10-27"
    const key = `cc_intake_${profileId}_${date}`;
    const data = localStorage.getItem(key);
    // Si no hay datos, retorna la estructura por defecto
    return data ? JSON.parse(data) : { date, items: [], totalCalories: 0 };
  },

  /**
   * Guarda la ingesta de un día específico para un perfil.
   * @param profileId - ID del usuario.
   * @param intake - El objeto DayIntake a guardar.
   */
  saveDayIntake(profileId: string, intake: DayIntake): void {
    const key = `cc_intake_${profileId}_${intake.date}`;
    localStorage.setItem(key, JSON.stringify(intake));
  },

  // --- Métodos de Historial (History) ---

  /**
   * Obtiene el historial de los últimos 5 días para un perfil.
   * @param profileId - ID del usuario.
   * @returns Un array de objetos DayIntake (hasta 5).
   */
  getHistory(profileId: string): DayIntake[] {
    const today = new Date();
    const history: DayIntake[] = [];
    
    // Itera 5 veces (de 0 a 4)
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i); // Resta 'i' días (0 = hoy, 1 = ayer, ...)
      const dateStr = date.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
      // Obtiene los datos de ese día y los añade al array
      history.push(this.getDayIntake(profileId, dateStr));
    }
    
    return history;
  },
};