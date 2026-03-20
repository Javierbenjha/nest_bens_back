import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseRepository } from '../../domain/purchase.repository';
import { Purchase } from '../../domain/purchase.entity';

@Injectable()
export class PrismaPurchaseRepository implements PurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(purchase: Purchase): Promise<Purchase> {
    return this.prisma.compra.create({
      data: {
        proveedorId: purchase.proveedorId,
        total: purchase.total,
        ...(purchase.articuloId != null && { articuloId: purchase.articuloId }),
      },
    }) as unknown as Purchase;
  }

  async findAll(): Promise<Purchase[]> {
    return this.prisma.compra.findMany() as unknown as Purchase[];
  }

  async findById(id: number): Promise<Purchase | null> {
    return this.prisma.compra.findUnique({
      where: { id },
    }) as unknown as Purchase | null;
  }

  async update(id: number, purchase: Partial<Purchase>): Promise<Purchase> {
    return this.prisma.compra.update({
      where: { id },
      data: purchase as any,
    }) as unknown as Purchase;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.compra.delete({ where: { id } });
  }
}
