import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductionOrderRepository } from '../../domain/production-order.repository';
import { ProductionOrder } from '../../domain/production-order.entity';

const ORDER_INCLUDE = {
  producto: { select: { id: true, nombre: true } },
  talla: { select: { id: true, nombre: true } },
  color: { select: { id: true, nombre: true } },
  usuario: { select: { id: true, correo: true } },
};

@Injectable()
export class PrismaProductionOrderRepository implements ProductionOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: ProductionOrder): Promise<ProductionOrder> {
    return this.prisma.ordenProduccion.create({
      data: {
        productoId: order.productoId,
        tallaId: order.tallaId ?? null,
        colorId: order.colorId ?? null,
        cantidadPlanificada: order.cantidadPlanificada,
        cantidadProducida: 0,
        estado: 'PENDIENTE',
        usuarioId: order.usuarioId ?? null,
        observaciones: order.observaciones ?? null,
      },
      include: ORDER_INCLUDE,
    }) as unknown as ProductionOrder;
  }

  async findAll(): Promise<ProductionOrder[]> {
    return this.prisma.ordenProduccion.findMany({
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    }) as unknown as ProductionOrder[];
  }

  async findById(id: number): Promise<ProductionOrder | null> {
    return this.prisma.ordenProduccion.findUnique({
      where: { id },
      include: ORDER_INCLUDE,
    }) as unknown as ProductionOrder | null;
  }

  async start(id: number): Promise<ProductionOrder> {
    return this.prisma.ordenProduccion.update({
      where: { id },
      data: { estado: 'EN_PROCESO', fechaInicio: new Date() },
      include: ORDER_INCLUDE,
    }) as unknown as ProductionOrder;
  }

  async complete(id: number, cantidadProducida: number): Promise<ProductionOrder> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Cargar la orden con la receta completa del producto
      const orden = await tx.ordenProduccion.findUnique({
        where: { id },
        include: {
          producto: {
            include: {
              receta: { include: { articulo: true } },
            },
          },
        },
      });

      if (!orden) throw new NotFoundException(`Orden ${id} no encontrada`);

      // 2. Verificar disponibilidad de materiales
      for (const item of orden.producto.receta) {
        const necesario = Number(item.cantidad) * cantidadProducida;
        const disponible = Number(item.articulo.cantidad);
        if (disponible < necesario) {
          throw new BadRequestException(
            `Material insuficiente: "${item.articulo.nombre}". ` +
            `Disponible: ${disponible} ${item.articulo.unidad}, ` +
            `necesario: ${necesario} ${item.articulo.unidad}`,
          );
        }
      }

      // 3. Descontar materiales del stock de artículos
      for (const item of orden.producto.receta) {
        const necesario = Number(item.cantidad) * cantidadProducida;
        await tx.articulo.update({
          where: { id: item.articuloId },
          data: { cantidad: { decrement: necesario } },
        });
      }

      // 4. Agregar stock al inventario de la variante producida
      const inventario = await tx.inventario.findFirst({
        where: {
          productoId: orden.productoId,
          tallaId: orden.tallaId ?? undefined,
          colorId: orden.colorId ?? undefined,
        },
      });

      if (inventario) {
        const stockAntes = inventario.stock;
        const stockDespues = stockAntes + cantidadProducida;

        await tx.inventario.update({
          where: { id: inventario.id },
          data: { stock: stockDespues },
        });

        await tx.movimientoInventario.create({
          data: {
            inventarioId: inventario.id,
            tipo: 'INGRESO',
            cantidad: cantidadProducida,
            stockAntes,
            stockDespues,
            referencia: `PRODUCCION-${id}`,
          },
        });
      }

      // 5. Cerrar la orden de producción
      return tx.ordenProduccion.update({
        where: { id },
        data: {
          cantidadProducida,
          estado: 'COMPLETADO',
          fechaFin: new Date(),
        },
        include: ORDER_INCLUDE,
      }) as unknown as ProductionOrder;
    });
  }

  async cancel(id: number): Promise<ProductionOrder> {
    return this.prisma.ordenProduccion.update({
      where: { id },
      data: { estado: 'CANCELADO' },
      include: ORDER_INCLUDE,
    }) as unknown as ProductionOrder;
  }
}
