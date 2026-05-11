import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Order } from '../../domain/order.entity';
import { OrderRepository } from '../../domain/order.repository';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: Order): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Verificar stock suficiente antes de proceder
      for (const item of order.items) {
        const inv = await tx.inventario.findFirst({
          where: {
            productoId: item.productoId,
            tallaId: item.tallaId,
            colorId: item.colorId,
          },
        });

        if (!inv) {
          throw new BadRequestException(
            `No existe registro de inventario para el producto ${item.productoId}`,
          );
        }
        if (inv.stock < item.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para el producto ${item.productoId}. Disponible: ${inv.stock}, solicitado: ${item.cantidad}`,
          );
        }
      }

      // 2. Crear el pedido
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
          medioPagoId: order.medioPagoId,
          tipoComprobanteId: order.tipoComprobanteId,
          direccionEnvio: order.direccionEnvio,
          observaciones: order.observaciones,
          origen: order.origen,
          fechaEntrega: order.fechaEntrega ? new Date(order.fechaEntrega) : null,
          detalles: {
            create: order.items.map((item) => ({
              productoId: item.productoId,
              tallaId: item.tallaId,
              colorId: item.colorId,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              descuento: item.descuento,
              subtotal: item.subtotal,
            })),
          },
        },
      });

      // 3. Descontar stock y registrar movimiento
      for (const item of order.items) {
        const inv = await tx.inventario.findFirst({
          where: {
            productoId: item.productoId,
            tallaId: item.tallaId,
            colorId: item.colorId,
          },
        });

        const stockAntes = inv!.stock;
        const stockDespues = stockAntes - item.cantidad;

        await tx.inventario.update({
          where: { id: inv!.id },
          data: { stock: stockDespues },
        });

        await tx.movimientoInventario.create({
          data: {
            inventarioId: inv!.id,
            tipo: 'EGRESO',
            cantidad: item.cantidad,
            stockAntes,
            stockDespues,
            referencia: `PEDIDO-${savedOrder.id}`,
          },
        });
      }

      // 4. Si hay cupón, incrementar el uso
      if (order.cuponId) {
        await tx.cupon.update({
          where: { id: order.cuponId },
          data: { usosActuales: { increment: 1 } },
        });
      }

      // 5. Retornar con todas las relaciones
      return tx.pedido.findUnique({
        where: { id: savedOrder.id },
        include: {
          cliente: true,
          medioPago: true,
          tipoComprobante: true,
          cupon: true,
          detalles: {
            include: { producto: true, talla: true, color: true },
          },
        },
      });
    });
  }

  async findById(id: number): Promise<any> {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        medioPago: true,
        tipoComprobante: true,
        cupon: true,
        detalles: {
          include: { producto: true, talla: true, color: true },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.pedido.findMany({
      include: {
        cliente: true,
        medioPago: true,
        tipoComprobante: true,
        cupon: true,
        detalles: {
          include: { producto: true, talla: true, color: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async confirmPayment(
    id: number,
    medioPagoId: number,
    tipoComprobanteId?: number,
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const pedido = await tx.pedido.findUnique({
        where: { id },
        include: { detalles: true },
      });

      if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
      if (pedido.estado === 'PAGADO')
        throw new ConflictException(`El pedido ${id} ya fue pagado`);
      if (pedido.estado === 'CANCELADO')
        throw new ConflictException(`El pedido ${id} está cancelado`);

      // 1. Marcar pedido como PAGADO
      const updated = await tx.pedido.update({
        where: { id },
        data: {
          estado: 'PAGADO',
          estadoPago: 'PAGADO',
          medioPagoId,
          ...(tipoComprobanteId && { tipoComprobanteId }),
        },
        include: {
          detalles: { include: { producto: true, talla: true, color: true } },
          medioPago: true,
          tipoComprobante: true,
          cliente: true,
          cupon: true,
        },
      });

      // 2. Crear Venta automáticamente
      await tx.venta.create({ data: { pedidoId: id } });

      return updated;
    });
  }

  async findByUsuarioId(usuarioId: number): Promise<unknown[]> {
    return this.prisma.pedido.findMany({
      where: { cliente: { usuarioId } },
      include: {
        detalles: { include: { producto: true, talla: true, color: true } },
        medioPago: true,
        cupon: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async cancel(id: number): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const pedido = await tx.pedido.findUnique({
        where: { id },
        include: { detalles: true },
      });

      if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
      if (pedido.estado === 'CANCELADO')
        throw new ConflictException(`El pedido ${id} ya está cancelado`);
      if (pedido.estado === 'ENTREGADO')
        throw new ConflictException(
          `No se puede cancelar un pedido ya entregado`,
        );
      if (pedido.estado === 'PAGADO')
        throw new ConflictException(
          `No se puede cancelar un pedido pagado. Emite una devolución`,
        );

      // 1. Cancelar pedido
      const updated = await tx.pedido.update({
        where: { id },
        data: { estado: 'CANCELADO', estadoPago: 'FALLIDO' },
        include: {
          detalles: { include: { producto: true, talla: true, color: true } },
          medioPago: true,
          tipoComprobante: true,
          cliente: true,
          cupon: true,
        },
      });

      // 2. Devolver stock y registrar movimiento DEVOLUCION
      for (const item of pedido.detalles) {
        const inv = await tx.inventario.findFirst({
          where: {
            productoId: item.productoId,
            tallaId: item.tallaId ?? undefined,
            colorId: item.colorId ?? undefined,
          },
        });

        if (inv) {
          const stockAntes = inv.stock;
          const stockDespues = stockAntes + item.cantidad;

          await tx.inventario.update({
            where: { id: inv.id },
            data: { stock: stockDespues },
          });

          await tx.movimientoInventario.create({
            data: {
              inventarioId: inv.id,
              tipo: 'DEVOLUCION',
              cantidad: item.cantidad,
              stockAntes,
              stockDespues,
              referencia: `CANCELACION-PEDIDO-${id}`,
            },
          });
        }
      }

      return updated;
    });
  }
}
