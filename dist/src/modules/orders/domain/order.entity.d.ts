import { OrderItem } from './order-item.entity';
import { Coupon } from '../../coupons/domain/coupon.entity';
export declare class Order {
    readonly clienteId: number;
    readonly usuarioId: number | null;
    readonly items: OrderItem[];
    subtotal: number;
    impuesto: number;
    descuento: number;
    descuentoCupon: number;
    total: number;
    cuponId: number | null;
    medioPagoId: number | null;
    tipoComprobanteId: number | null;
    direccionEnvio: string | null;
    observaciones: string | null;
    origen: 'ERP' | 'ECOMMERCE';
    fechaEntrega: string | null;
    constructor(clienteId: number, usuarioId: number | null, items: OrderItem[], subtotal?: number, impuesto?: number, descuento?: number, descuentoCupon?: number, total?: number, cuponId?: number | null, medioPagoId?: number | null, tipoComprobanteId?: number | null, direccionEnvio?: string | null, observaciones?: string | null, origen?: 'ERP' | 'ECOMMERCE', fechaEntrega?: string | null);
    private calculateTotals;
    applyCoupon(coupon: Coupon): void;
    addTaxes(taxRate: number): void;
}
