/**
 * Hashea una contraseña usando el algoritmo SHA-256.
 * ¡Advertencia! Esto es solo para fines educativos/demo.
 * En una app real, el hash DEBE ocurrir en un servidor backend
 * usando un algoritmo lento como bcrypt o Argon2.
 * @param password - La contraseña en texto plano.
 * @returns Una promesa que se resuelve con el hash en formato hexadecimal.
 */
export async function hashPassword(password: string): Promise<string> {
  // 1. Codifica el string de la contraseña a un array de bytes (Uint8Array)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // 2. Usa el API de criptografía del navegador para crear el hash SHA-256
  //    'digest' retorna un ArrayBuffer
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  
  // 3. Convierte el ArrayBuffer a un array de números (bytes)
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  // 4. Convierte cada byte a su representación hexadecimal (ej. 255 -> "ff")
  //    'padStart(2, '0')' asegura que cada byte tenga 2 dígitos (ej. 1 -> "01")
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Verifica una contraseña en texto plano contra un hash almacenado.
 * @param password - La contraseña en texto plano que ingresó el usuario.
 * @param hash - El hash que está guardado en localStorage.
 * @returns Una promesa que se resuelve a 'true' si coinciden, 'false' si no.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // 1. Hashea la contraseña que el usuario acaba de ingresar
  const passwordHash = await hashPassword(password);
  
  // 2. Compara el nuevo hash con el hash almacenado
  //    (Esta comparación debe ser segura contra ataques de tiempo,
  //    aunque para este demo, '===' es suficiente).
  return passwordHash === hash;
}