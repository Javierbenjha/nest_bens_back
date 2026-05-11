import { SalesService } from '../../application/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createSaleDto: CreateSaleDto): Promise<import("../../domain/sale.entity").Sale>;
    createFromOrder(pedidoId: string): Promise<import("../../domain/sale.entity").Sale>;
    findAll(): Promise<import("../../domain/sale.entity").Sale[]>;
    findOne(id: string): Promise<import("../../domain/sale.entity").Sale>;
    remove(id: string): Promise<void>;
}
