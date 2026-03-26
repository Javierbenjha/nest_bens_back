import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Order } from '../../domain/order.entity';
import { OrderRepository } from '../../domain/order.repository';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: Order): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Creamos el pedido
      const savedOrder = await tx.pedido.create({
        data: {
          clienteId: order.clienteId,
          usuarioId: order.usuarioId,
          cuponId: order.cuponId,
          subtotal: order.subtotal,
          impuesto: order.impuesto,
          descuento: order.descuento,
          descuentoCupon: order.descuentoCupon,
          total: order.total,
          detalles: {
            create: order.items.map((item) => ({
              productoId: item.productoId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              descuento: item.descuento,
              subtotal: item.subtotal,
            })),
          },
        },
      });

      // 2. Si hay cupón, incrementamos el uso
      if (order.cuponId) {
        await tx.cupon.update({
          where: { id: order.cuponId },
          data: { usosActuales: { increment: 1 } },
        });
      }

      return savedOrder;
    });
  }

  async findById(id: number): Promise<any> {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { detalles: true, cupon: true },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.pedido.findMany({
      include: { detalles: true },
    });
  }
}
