import { Supplier } from './supplier.entity';

export interface SupplierRepository {
  create(supplier: Supplier): Promise<Supplier>;
  findAll(): Promise<Supplier[]>;
  findById(id: number): Promise<Supplier | null>;
  update(id: number, supplier: Partial<Supplier>): Promise<Supplier>;
  delete(id: number): Promise<void>;
}
