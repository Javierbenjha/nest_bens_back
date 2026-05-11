import { ProductionOrder } from './production-order.entity';
export interface ProductionOrderRepository {
    create(order: ProductionOrder): Promise<ProductionOrder>;
    findAll(): Promise<ProductionOrder[]>;
    findById(id: number): Promise<ProductionOrder | null>;
    start(id: number): Promise<ProductionOrder>;
    complete(id: number, cantidadProducida: number): Promise<ProductionOrder>;
    cancel(id: number): Promise<ProductionOrder>;
}
