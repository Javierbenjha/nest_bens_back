import { Inject, Injectable } from '@nestjs/common';
import type { SupplierRepository } from '../domain/supplier.repository';
import type { Supplier } from '../domain/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repo: SupplierRepository,
  ) {}

  create(supplier: Partial<Supplier>): Promise<Supplier> {
    return this.repo.create(supplier as Supplier);
  }

  findAll(): Promise<Supplier[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Supplier | null> {
    return this.repo.findById(id);
  }

  update(id: number, supplier: Partial<Supplier>): Promise<Supplier> {
    return this.repo.update(id, supplier);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
