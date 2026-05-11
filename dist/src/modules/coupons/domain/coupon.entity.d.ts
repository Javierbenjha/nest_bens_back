import { TipoCupon } from '@prisma/client';
export declare class Coupon {
    readonly id: number;
    readonly codigo: string;
    readonly valor: number;
    readonly tipo: TipoCupon;
    readonly usosMaximos: number | null;
    readonly usosActuales: number;
    readonly activo: boolean;
    readonly fechaExpiracion: Date | null;
    constructor(id: number, codigo: string, valor: number, tipo: TipoCupon, usosMaximos: number | null, usosActuales: number, activo: boolean, fechaExpiracion: Date | null);
    isValid(): boolean;
    calculateDiscount(subtotal: number): number;
}
