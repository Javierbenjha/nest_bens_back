import type { SaleRepository } from '../domain/sale.repository';
import type { Sale } from '../domain/sale.entity';
export declare class SalesService {
    private readonly repo;
    constructor(repo: SaleRepository);
    createFromOrder(pedidoId: number): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    findOne(id: number): Promise<Sale>;
    remove(id: number): Promise<void>;
}
