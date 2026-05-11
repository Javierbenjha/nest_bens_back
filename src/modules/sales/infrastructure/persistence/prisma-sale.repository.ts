import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleRepository } from '../../domain/sale.repository';
import { Sale } from '../../domain/sale.entity';

const VENTA_INCLUDE = {
  pedido: {
    include: {
      cliente: true,
      medioPago: true,
      detalles: {
        include: { producto: true, talla: true, color: true },
      },
    },
  },
};

@Injectable()
export class PrismaSaleRepository implements SaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPedidoById(pedidoId: number): Promise<{ estado: string } | null> {
    return this.prisma.pedido.findUnique({
      where: { id: pedidoId },
      select: { estado: true },
    });
  }

  async findByPedidoId(pedidoId: number): Promise<Sale | null> {
    return this.prisma.venta.findUnique({ where: { pedidoId } }) as unknown as Sale | null;
  }

  async save(pedidoId: number): Promise<Sale> {
    return this.prisma.venta.create({
      data: { pedidoId },
      include: VENTA_INCLUDE,
    }) as unknown as Sale;
  }

  async findAll(): Promise<Sale[]> {
    return this.prisma.venta.findMany({ include: VENTA_INCLUDE }) as unknown as Sale[];
  }

  async findById(id: number): Promise<Sale | null> {
    return this.prisma.venta.findUnique({
      where: { id },
      include: VENTA_INCLUDE,
    }) as unknown as Sale | null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const venta = await tx.venta.findUnique({ where: { id } });
      if (!venta) throw new NotFoundException(`Venta con ID ${id} no encontrada`);
      // HU-028: al anular la venta, el pedido vuelve a estado PENDIENTE
      await tx.pedido.update({
        where: { id: venta.pedidoId },
        data: { estado: 'PENDIENTE', estadoPago: 'PENDIENTE' },
      });
      await tx.venta.delete({ where: { id } });
    });
  }
}
