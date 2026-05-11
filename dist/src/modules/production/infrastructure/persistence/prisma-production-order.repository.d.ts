import { PrismaService } from 'src/prisma/prisma.service';
import { ProductionOrderRepository } from '../../domain/production-order.repository';
import { ProductionOrder } from '../../domain/production-order.entity';
export declare class PrismaProductionOrderRepository implements ProductionOrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(order: ProductionOrder): Promise<ProductionOrder>;
    findAll(): Promise<ProductionOrder[]>;
    findById(id: number): Promise<ProductionOrder | null>;
    start(id: number): Promise<ProductionOrder>;
    complete(id: number, cantidadProducida: number): Promise<ProductionOrder>;
    cancel(id: number): Promise<ProductionOrder>;
}
