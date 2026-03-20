import { Brand } from './brand.entity';

export interface BrandRepository {
  create(brand: Brand): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: number): Promise<Brand | null>;
  update(id: number, brand: Partial<Brand>): Promise<Brand>;
  delete(id: number): Promise<void>;
}
