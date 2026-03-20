export class CreatePurchaseDto {
  proveedorId: number;
  articuloId?: number;
  cantidad?: number;
  precio?: number;
  fecha?: Date;
  total: number;
}
