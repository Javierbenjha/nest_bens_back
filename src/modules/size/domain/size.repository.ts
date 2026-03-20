import { Size } from './size.entity';

export interface SizeRepository {
  create(size: Size): Promise<Size>;
  findAll(): Promise<Size[]>;
  findById(id: number): Promise<Size | null>;
  update(id: number, size: Partial<Size>): Promise<Size>;
  delete(id: number): Promise<void>;
}
