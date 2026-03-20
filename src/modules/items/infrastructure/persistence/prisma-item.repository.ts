import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemRepository } from '../../domain/item.repository';
import { Item } from '../../domain/item.entity';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: Item): Promise<Item> {
    return this.prisma.articulo.create({
      data: {
        nombre: item.nombre,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio: item.precio,
        unidad: item.unidad,
      },
    }) as unknown as Item;
  }

  async findAll(): Promise<Item[]> {
    return this.prisma.articulo.findMany({
      include: { compras: true },
    }) as unknown as Item[];
  }

  async findById(id: number): Promise<Item | null> {
    return this.prisma.articulo.findUnique({
      where: { id },
      include: { compras: true },
    }) as unknown as Item | null;
  }

  async update(id: number, item: Partial<Item>): Promise<Item> {
    return this.prisma.articulo.update({
      where: { id },
      data: {
        nombre: item.nombre,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio: item.precio,
        unidad: item.unidad,
      },
    }) as unknown as Item;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.articulo.delete({ where: { id } });
  }
}
