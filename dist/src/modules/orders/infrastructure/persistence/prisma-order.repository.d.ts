import { PrismaService } from '../../../../prisma/prisma.service';
import { Order } from '../../domain/order.entity';
import { OrderRepository } from '../../domain/order.repository';
export declare class PrismaOrderRepository implements OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(order: Order): Promise<any>;
    findById(id: number): Promise<any>;
    findAll(): Promise<any[]>;
    confirmPayment(id: number, medioPagoId: number, tipoComprobanteId?: number): Promise<any>;
    findByUsuarioId(usuarioId: number): Promise<unknown[]>;
    cancel(id: number): Promise<any>;
}
