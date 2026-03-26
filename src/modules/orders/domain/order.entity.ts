import { OrderItem } from './order-item.entity';
import { Coupon } from '../../coupons/domain/coupon.entity';

export class Order {
  constructor(
    public readonly clienteId: number,
    public readonly usuarioId: number | null,
    public readonly items: OrderItem[],
    public subtotal: number = 0,
    public impuesto: number = 0,
    public descuento: number = 0, // Descuento acumulado de productos
    public descuentoCupon: number = 0, // Descuento específico del cupón
    public total: number = 0,
    public cuponId: number | null = null,
  ) {
    this.calculateTotals();
  }

  private calculateTotals(): void {
    // 1. Sumamos subtotales y descuentos de los productos individuales
    this.subtotal = this.items.reduce((acc, item) => acc + item.subtotal, 0);
    this.descuento = this.items.reduce((acc, item) => acc + item.descuento, 0);

    // Por defecto, el total es el subtotal
    this.total = this.subtotal;
  }

  applyCoupon(coupon: Coupon): void {
    if (!coupon.isValid()) {
      throw new Error('El cupón no es válido, ya expiró o no tiene usos disponibles.');
    }

    // El descuento del cupón se aplica sobre el subtotal que ya tiene los descuentos por producto
    this.descuentoCupon = coupon.calculateDiscount(this.subtotal);
    this.descuento += this.descuentoCupon; 
    
    this.total -= this.descuentoCupon;
    this.cuponId = coupon.id;
  }

  addTaxes(taxRate: number): void {
    this.impuesto = this.total * taxRate;
    this.total += this.impuesto;
  }
}
