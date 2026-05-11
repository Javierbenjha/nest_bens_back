import { Sale } from './sale.entity';
export interface SaleRepository {
    findPedidoById(pedidoId: number): Promise<{
        estado: string;
    } | null>;
    findByPedidoId(pedidoId: number): Promise<Sale | null>;
    save(pedidoId: number): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    findById(id: number): Promise<Sale | null>;
    delete(id: number): Promise<void>;
}
