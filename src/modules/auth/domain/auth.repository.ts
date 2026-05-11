import type { AuthToken, AuthUser } from './auth.entity';

// Datos necesarios para registrar un nuevo usuario cliente
export interface RegisterData {
  correo: string;
  password: string; // ya hasheado por AuthService
  nombre: string;
  apellido: string;
  telefono?: string | null;
}

// Port (interfaz del dominio): todo lo que Auth necesita persistir
export interface AuthRepository {
  /**
   * Busca un usuario por correo y retorna sus datos incluyendo el password (para validación).
   * Retorna null si no existe.
   */
  findByEmail(correo: string): Promise<AuthUser & { password: string } | null>;

  /**
   * Crea en una transacción atómica:
   *   1. El registro de Usuario (con rol CLIENTE)
   *   2. El perfil de Cliente vinculado
   * Retorna los datos del usuario y cliente creados.
   */
  createUserWithClient(data: RegisterData): Promise<AuthUser>;
}
