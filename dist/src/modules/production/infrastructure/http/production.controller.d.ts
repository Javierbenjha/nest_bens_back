import { ProductionService } from '../../application/production.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { CompleteProductionOrderDto } from './dto/complete-production-order.dto';
export declare class ProductionController {
    private readonly productionService;
    constructor(productionService: ProductionService);
    create(dto: CreateProductionOrderDto, req: any): Promise<import("../../domain/production-order.entity").ProductionOrder>;
    findAll(): Promise<import("../../domain/production-order.entity").ProductionOrder[]>;
    findOne(id: number): Promise<import("../../domain/production-order.entity").ProductionOrder>;
    start(id: number): Promise<import("../../domain/production-order.entity").ProductionOrder>;
    complete(id: number, dto: CompleteProductionOrderDto): Promise<import("../../domain/production-order.entity").ProductionOrder>;
    cancel(id: number): Promise<import("../../domain/production-order.entity").ProductionOrder>;
}
