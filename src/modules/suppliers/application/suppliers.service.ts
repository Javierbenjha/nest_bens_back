import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { SupplierRepository } from '../domain/supplier.repository';
import type { Supplier } from '../domain/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject('SupplierRepository')
    private readonly repo: SupplierRepository,
  ) {}

  async create(supplier: Partial<Supplier>): Promise<Supplier> {
    // Check if supplier with same document exists
    if (supplier.documento) {
      const existingByDoc = await this.repo.findByDocumento(supplier.documento);
      if (existingByDoc) {
        throw new ConflictException(`Ya existe un proveedor con el documento ${supplier.documento}`);
      }
    }

    // Check if supplier with same email exists
    if (supplier.correo) {
      const existingByEmail = await this.repo.findByEmail(supplier.correo);
      if (existingByEmail) {
        throw new ConflictException(`Ya existe un proveedor con el correo ${supplier.correo}`);
      }
    }

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
