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
  createdAt?: Date;
}
