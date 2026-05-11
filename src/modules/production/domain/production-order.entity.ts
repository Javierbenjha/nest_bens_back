export type EstadoProduccion = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';

export class ProductionOrder {
  id?: number;
  productoId: number;
  tallaId?: number | null;
  colorId?: number | null;
  cantidadPlanificada: number;
  cantidadProducida: number;
  estado: EstadoProduccion;
  usuarioId?: number | null;
  observaciones?: string | null;
  fechaInicio?: Date | null;
  fechaFin?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
