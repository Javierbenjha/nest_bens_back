export declare class AuthToken {
    readonly access_token: string;
    readonly user: AuthUser;
    constructor(access_token: string, user: AuthUser);
}
export declare class AuthUser {
    readonly id: number;
    readonly correo: string;
    readonly rol: string;
    readonly cliente?: (AuthCliente | null) | undefined;
    constructor(id: number, correo: string, rol: string, cliente?: (AuthCliente | null) | undefined);
}
export interface AuthCliente {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string | null;
}
