import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    // Implementación general de venta si se requiere en el futuro
    return 'This action adds a new sale';
  }

  async createFromOrder(pedidoId: number) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Validar que el pedido exista y traer detalles
      const pedido = await tx.pedido.findUnique({
        where: { id: pedidoId },
        include: { detalles: true }
      });

      if (!pedido) {
        throw new NotFoundException(`Pedido con ID ${pedidoId} no encontrado`);
      }

      // 2. Validar que no se haya procesado ya una venta para este pedido
      const existingSale = await tx.venta.findUnique({
        where: { pedidoId }
      });

      if (existingSale) {
        throw new ConflictException(`Ya existe una venta registrada para el pedido ${pedidoId}`);
      }

      // 3. Crear la venta
      const venta = await tx.venta.create({
        data: {
          pedidoId: pedido.id,
          clienteId: pedido.clienteId,
          subtotal: pedido.subtotal,
          impuesto: pedido.impuesto,
          total: pedido.total,
          detalles: {
            create: pedido.detalles.map(d => ({
              productoId: d.productoId,
              cantidad: d.cantidad,
              precio: d.precioUnitario,
              descuento: d.descuento,
              subtotal: d.subtotal
            }))
          }
        },
        include: {
          detalles: true
        }
      });

      // 4. Actualizar estado del pedido a PAGADO
      await tx.pedido.update({
        where: { id: pedidoId },
        data: { estado: 'PAGADO' }
      });

      return venta;
    });
  }

  findAll() {
    return this.prisma.venta.findMany({
      include: { detalles: true, cliente: true }
    });
  }

  findOne(id: number) {
    return this.prisma.venta.findUnique({
      where: { id },
      include: { detalles: true, cliente: true }
    });
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return this.prisma.venta.delete({
      where: { id }
    });
  }
}
