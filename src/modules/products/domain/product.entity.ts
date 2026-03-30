export class Product {
  id?: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  cantidad?: number | null;
  categoriaId: number;
  marcaId: number;
  color?: string[];
  tallas?: string[];
  imagenes?: string[];
  sku?: string;
  descuento?: number;
  valorDescuento?: number;
  createdAt?: Date;
  categoria?: { id: number; nombre: string };
  marca?: { id: number; nombre: string };
}
