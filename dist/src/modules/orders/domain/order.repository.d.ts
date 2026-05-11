import { Order } from './order.entity';
export interface OrderRepository {
    save(order: Order): Promise<unknown>;
    findById(id: number): Promise<unknown>;
    findAll(): Promise<unknown[]>;
    confirmPayment(id: number, medioPagoId: number, tipoComprobanteId?: number): Promise<unknown>;
    cancel(id: number): Promise<unknown>;
    findByUsuarioId(usuarioId: number): Promise<unknown[]>;
}
