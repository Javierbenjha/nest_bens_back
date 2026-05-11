import type { ProductionOrderRepository } from '../domain/production-order.repository';
import type { ProductionOrder } from '../domain/production-order.entity';
export declare class ProductionService {
    private readonly repo;
    constructor(repo: ProductionOrderRepository);
    create(data: ProductionOrder): Promise<ProductionOrder>;
    findAll(): Promise<ProductionOrder[]>;
    findOne(id: number): Promise<ProductionOrder>;
    start(id: number): Promise<ProductionOrder>;
    complete(id: number, cantidadProducida: number): Promise<ProductionOrder>;
    cancel(id: number): Promise<ProductionOrder>;
}
