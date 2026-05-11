import type { AuthUser } from './auth.entity';
export interface RegisterData {
    correo: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono?: string | null;
}
export interface AuthRepository {
    findByEmail(correo: string): Promise<AuthUser & {
        password: string;
    } | null>;
    createUserWithClient(data: RegisterData): Promise<AuthUser>;
}
