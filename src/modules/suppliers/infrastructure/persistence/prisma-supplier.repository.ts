import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierRepository } from '../../domain/supplier.repository';
import { Supplier } from '../../domain/supplier.entity';

@Injectable()
export class PrismaSupplierRepository implements SupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(supplier: Supplier): Promise<Supplier> {
    return this.prisma.proveedor.create({
      data: supplier as any,
    }) as unknown as Supplier;
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.proveedor.findMany() as unknown as Supplier[];
  }

  async findById(id: number): Promise<Supplier | null> {
    return this.prisma.proveedor.findUnique({ where: { id } }) as unknown as Supplier | null;
  }

  async findByDocumento(documento: string): Promise<Supplier | null> {
    return this.prisma.proveedor.findUnique({ where: { documento } }) as unknown as Supplier | null;
  }

  async findByEmail(correo: string): Promise<Supplier | null> {
    return this.prisma.proveedor.findUnique({ where: { correo } }) as unknown as Supplier | null;
  }

  async update(id: number, supplier: Partial<Supplier>): Promise<Supplier> {
    return this.prisma.proveedor.update({
      where: { id },
      data: supplier as any,
    }) as unknown as Supplier;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.proveedor.delete({ where: { id } });
  }
}
