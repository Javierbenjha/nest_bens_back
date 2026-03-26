import { TipoCupon } from '@prisma/client';

export class Coupon {
  constructor(
    public readonly id: number,
    public readonly codigo: string,
    public readonly valor: number,
    public readonly tipo: TipoCupon,
    public readonly usosMaximos: number | null,
    public readonly usosActuales: number,
    public readonly activo: boolean,
    public readonly fechaExpiracion: Date | null,
  ) {}

  isValid(): boolean {
    const now = new Date();
    
    if (!this.activo) return false;
    
    if (this.fechaExpiracion && this.fechaExpiracion < now) return false;
    
    if (this.usosMaximos !== null && this.usosActuales >= this.usosMaximos) return false;
    
    return true;
  }

  calculateDiscount(subtotal: number): number {
    if (this.tipo === 'PORCENTAJE') {
      return subtotal * (this.valor / 100);
    }
    return Math.min(this.valor, subtotal); // No puede descontar más del subtotal
  }
}
