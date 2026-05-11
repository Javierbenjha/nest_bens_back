export class Product {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  categoriaId: number;
  marcaId: number;
  color?: string[];
  tallas?: string[];
  imagenes?: string[];
  sku?: string;
  tipoDescuento?: 'PORCENTAJE' | 'VALOR_FIJO' | 'SIN_DESCUENTO';
  valorDescuento?: number;
  createdAt?: Date;
  categoria?: { id: number; nombre: string };
  marca?: { id: number; nombre: string };
}
