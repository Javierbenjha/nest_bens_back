import { PrismaService } from 'src/prisma/prisma.service';
import { SaleRepository } from '../../domain/sale.repository';
import { Sale } from '../../domain/sale.entity';
export declare class PrismaSaleRepository implements SaleRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPedidoById(pedidoId: number): Promise<{
        estado: string;
    } | null>;
    findByPedidoId(pedidoId: number): Promise<Sale | null>;
    save(pedidoId: number): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    findById(id: number): Promise<Sale | null>;
    delete(id: number): Promise<void>;
}
