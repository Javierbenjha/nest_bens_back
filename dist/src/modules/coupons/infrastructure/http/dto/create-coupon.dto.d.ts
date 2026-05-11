import { TipoCupon } from '@prisma/client';
export declare class CreateCouponDto {
    codigo: string;
    descripcion?: string;
    valor: number;
    tipo?: TipoCupon;
    usosMaximos?: number;
    fechaExpiracion?: string;
    activo?: boolean;
}
