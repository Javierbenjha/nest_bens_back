// Representa el resultado de una autenticación exitosa (login o registro)
export class AuthToken {
  constructor(
    public readonly access_token: string,
    public readonly user: AuthUser,
  ) {}
}

// Datos del usuario expuestos en la respuesta de auth (sin password)
export class AuthUser {
  constructor(
    public readonly id: number,
    public readonly correo: string,
    public readonly rol: string,
    public readonly cliente?: AuthCliente | null,
  ) {}
}

export interface AuthCliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string | null;
}
