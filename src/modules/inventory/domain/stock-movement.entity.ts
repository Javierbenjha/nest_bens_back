export type TipoMovimiento = 'INGRESO' | 'EGRESO' | 'AJUSTE' | 'DEVOLUCION';

export class StockMovement {
  id?: number;
  inventarioId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  stockAntes: number;
  stockDespues: number;
  referencia?: string;
  notas?: string;
  createdAt?: Date;
}
