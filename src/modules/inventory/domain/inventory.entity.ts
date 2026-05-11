export class Inventory {
  id?: number;
  productoId: number;
  colorId: number;
  tallaId: number;
  stock: number;
  stockMinimo: number;
  precio: number;
  producto?: { id: number; nombre: string; precio: number };
  color?: { id: number; nombre: string };
  talla?: { id: number; nombre: string };
  createdAt?: Date;
  updatedAt?: Date;
}
