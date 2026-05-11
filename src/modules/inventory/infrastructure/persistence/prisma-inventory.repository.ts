import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryRepository } from '../../domain/inventory.repository';
import { Inventory } from '../../domain/inventory.entity';
import {
  StockMovement,
  TipoMovimiento,
} from '../../domain/stock-movement.entity';

const INCLUDE = { producto: true, color: true, talla: true };

@Injectable()
export class PrismaInventoryRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    productoId: number;
    colorId: number;
    tallaId: number;
    stock: number;
    stockMinimo: number;
    precio: number;
  }): Promise<Inventory> {
    return this.prisma.inventario.create({
      data,
      include: INCLUDE,
    }) as unknown as Promise<Inventory>;
  }

  findAll(): Promise<Inventory[]> {
    return this.prisma.inventario.findMany({
      include: INCLUDE,
    }) as unknown as Promise<Inventory[]>;
  }

  findById(id: number): Promise<Inventory | null> {
    return this.prisma.inventario.findUnique({
      where: { id },
      include: INCLUDE,
    }) as unknown as Promise<Inventory | null>;
  }

  findByProduct(productoId: number): Promise<Inventory[]> {
    return this.prisma.inventario.findMany({
      where: { productoId },
      include: { color: true, talla: true },
    }) as unknown as Promise<Inventory[]>;
  }

  findLowStock(): Promise<Inventory[]> {
    return this.prisma.$queryRaw`
      SELECT i.*, p.nombre as productoNombre
      FROM Inventario i
      JOIN Producto p ON i.productoId = p.id
      WHERE i.stock <= i.stockMinimo
      ORDER BY (i.stock - i.stockMinimo) ASC
    ` as unknown as Promise<Inventory[]>;
  }

  update(id: number, stock: number, stockMinimo?: number, precio?: number): Promise<Inventory> {
    return this.prisma.inventario.update({
      where: { id },
      data: {
        stock,
        ...(stockMinimo !== undefined && { stockMinimo }),
        ...(precio !== undefined && { precio }),
      },
      include: INCLUDE,
    }) as unknown as Promise<Inventory>;
  }

  async logMovement(data: {
    inventarioId: number;
    tipo: TipoMovimiento;
    cantidad: number;
    stockAntes: number;
    stockDespues: number;
    referencia?: string;
    notas?: string;
  }): Promise<StockMovement> {
    return this.prisma.movimientoInventario.create({
      data,
    }) as unknown as Promise<StockMovement>;
  }

  getMovements(inventarioId: number): Promise<StockMovement[]> {
    return this.prisma.movimientoInventario.findMany({
      where: { inventarioId },
      orderBy: { createdAt: 'desc' },
    }) as unknown as Promise<StockMovement[]>;
  }
}
