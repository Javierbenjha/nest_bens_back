import { Inventory } from './inventory.entity';
import { StockMovement, TipoMovimiento } from './stock-movement.entity';

export interface InventoryRepository {
  create(data: { productoId: number; colorId: number; tallaId: number; stock: number; stockMinimo: number; precio: number }): Promise<Inventory>;
  findAll(): Promise<Inventory[]>;
  findById(id: number): Promise<Inventory | null>;
  findByProduct(productoId: number): Promise<Inventory[]>;
  findLowStock(): Promise<Inventory[]>;
  update(id: number, stock: number, stockMinimo?: number, precio?: number): Promise<Inventory>;
  logMovement(data: {
    inventarioId: number;
    tipo: TipoMovimiento;
    cantidad: number;
    stockAntes: number;
    stockDespues: number;
    referencia?: string;
    notas?: string;
  }): Promise<StockMovement>;
  getMovements(inventarioId: number): Promise<StockMovement[]>;
}
