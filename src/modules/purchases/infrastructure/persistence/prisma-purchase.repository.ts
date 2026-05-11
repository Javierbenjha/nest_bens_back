import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseRepository } from '../../domain/purchase.repository';
import { Purchase } from '../../domain/purchase.entity';

@Injectable()
export class PrismaPurchaseRepository implements PurchaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(purchase: Purchase): Promise<Purchase> {
    return this.prisma.$transaction(async (tx) => {
      const total = purchase.detalles.reduce(
        (sum, d) => sum + d.cantidad * d.precio,
        0,
      );

      const compra = await tx.compra.create({
        data: { tipo: purchase.tipo, proveedorId: purchase.proveedorId, total },
      });

      if (purchase.tipo === 'PRODUCTO') {
        for (const detalle of purchase.detalles) {
          await tx.detalle_Compra.create({
            data: {
              compraId: compra.id,
              productoId: detalle.productoId!,
              tallaId: detalle.tallaId ?? null,
              colorId: detalle.colorId ?? null,
              cantidad: detalle.cantidad,
              precio: detalle.precio,
              subtotal: detalle.cantidad * detalle.precio,
            },
          });

          const inv = await tx.inventario.findFirst({
            where: {
              productoId: detalle.productoId!,
              ...(detalle.tallaId != null && { tallaId: detalle.tallaId }),
              ...(detalle.colorId != null && { colorId: detalle.colorId }),
            },
          });

          if (inv) {
            const stockAntes = inv.stock;
            const stockDespues = stockAntes + detalle.cantidad;

            await tx.inventario.update({
              where: { id: inv.id },
              data: { stock: stockDespues },
            });

            await tx.movimientoInventario.create({
              data: {
                inventarioId: inv.id,
                tipo: 'INGRESO',
                cantidad: detalle.cantidad,
                stockAntes,
                stockDespues,
                referencia: `COMPRA-${compra.id}`,
              },
            });
          }
        }
      } else {
        for (const detalle of purchase.detalles) {
          await tx.detalle_Compra_Articulo.create({
            data: {
              compraId: compra.id,
              articuloId: detalle.articuloId!,
              cantidad: detalle.cantidad,
              precio: detalle.precio,
              subtotal: detalle.cantidad * detalle.precio,
            },
          });

          await tx.articulo.update({
            where: { id: detalle.articuloId! },
            data: { cantidad: { increment: detalle.cantidad } },
          });
        }
      }

      return tx.compra.findUnique({
        where: { id: compra.id },
        include: {
          proveedor: true,
          detalles: { include: { producto: true, talla: true, color: true } },
          detallesArticulo: { include: { articulo: true } },
        },
      });
    }) as unknown as Purchase;
  }

  async findAll(): Promise<Purchase[]> {
    return this.prisma.compra.findMany({
      include: {
        proveedor: true,
        detalles: { include: { producto: true, talla: true, color: true } },
        detallesArticulo: { include: { articulo: true } },
      },
    }) as unknown as Purchase[];
  }

  async findById(id: number): Promise<Purchase | null> {
    return this.prisma.compra.findUnique({
      where: { id },
      include: {
        proveedor: true,
        detalles: { include: { producto: true, talla: true, color: true } },
        detallesArticulo: { include: { articulo: true } },
      },
    }) as unknown as Purchase | null;
  }

  async anular(id: number): Promise<Purchase> {
    return this.prisma.$transaction(async (tx) => {
      const compra = await tx.compra.findUnique({
        where: { id },
        include: { detalles: true, detallesArticulo: true },
      });

      if (!compra) throw new NotFoundException(`Compra ${id} no encontrada`);
      if (compra.estado === 'ANULADO') throw new Error(`La compra ${id} ya está anulada`);

      // Revertir stock de inventario si es tipo PRODUCTO
      if (compra.tipo === 'PRODUCTO') {
        for (const detalle of compra.detalles) {
          const inv = await tx.inventario.findFirst({
            where: {
              productoId: detalle.productoId,
              ...(detalle.tallaId && { tallaId: detalle.tallaId }),
              ...(detalle.colorId && { colorId: detalle.colorId }),
            },
          });
          if (inv) {
            const stockAntes = inv.stock;
            const stockDespues = Math.max(0, stockAntes - detalle.cantidad);
            await tx.inventario.update({
              where: { id: inv.id },
              data: { stock: stockDespues },
            });
            await tx.movimientoInventario.create({
              data: {
                inventarioId: inv.id,
                tipo: 'EGRESO',
                cantidad: detalle.cantidad,
                stockAntes,
                stockDespues,
                referencia: `ANULACION-COMPRA-${id}`,
              },
            });
          }
        }
      }

      // Revertir stock de insumos si es tipo ARTICULO
      if (compra.tipo === 'ARTICULO') {
        for (const detalle of compra.detallesArticulo) {
          await tx.articulo.update({
            where: { id: detalle.articuloId },
            data: { cantidad: { decrement: detalle.cantidad } },
          });
        }
      }

      // Marcar como ANULADO sin eliminar
      return tx.compra.update({
        where: { id },
        data: { estado: 'ANULADO' },
        include: {
          proveedor: true,
          detalles: { include: { producto: true, talla: true, color: true } },
          detallesArticulo: { include: { articulo: true } },
        },
      }) as unknown as Purchase;
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const compra = await tx.compra.findUnique({
        where: { id },
        include: { detalles: true, detallesArticulo: true },
      });
      if (!compra) throw new NotFoundException(`Compra ${id} no encontrada`);

      // Revertir stock de inventario si es tipo PRODUCTO
      if (compra.tipo === 'PRODUCTO') {
        for (const detalle of compra.detalles) {
          const inv = await tx.inventario.findFirst({
            where: {
              productoId: detalle.productoId,
              ...(detalle.tallaId && { tallaId: detalle.tallaId }),
              ...(detalle.colorId && { colorId: detalle.colorId }),
            },
          });
          if (inv) {
            const stockAntes = inv.stock;
            const stockDespues = Math.max(0, stockAntes - detalle.cantidad);
            await tx.inventario.update({
              where: { id: inv.id },
              data: { stock: stockDespues },
            });
            await tx.movimientoInventario.create({
              data: {
                inventarioId: inv.id,
                tipo: 'EGRESO',
                cantidad: detalle.cantidad,
                stockAntes,
                stockDespues,
                referencia: `ANULACION-COMPRA-${id}`,
              },
            });
          }
        }
      }

      // Revertir stock de insumos si es tipo ARTICULO
      if (compra.tipo === 'ARTICULO') {
        for (const detalle of compra.detallesArticulo) {
          await tx.articulo.update({
            where: { id: detalle.articuloId },
            data: { cantidad: { decrement: detalle.cantidad } },
          });
        }
      }

      await tx.compra.delete({ where: { id } });
    });
  }
}
