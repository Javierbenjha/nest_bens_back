export class Purchase {
  id?: number;
  proveedorId: number;
  articuloId?: number | null;
  total: number;
  createdAt?: Date;
}
