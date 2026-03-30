import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const { color, tallas, ...productoData } = product;

    return this.prisma.$transaction(async (tx) => {
      const created = await tx.producto.create({ data: productoData as any });

      if (color && color.length > 0) {
        await tx.color.createMany({
          data: color.map((nombre) => ({ nombre, productoId: created.id })),
        });
      }

      if (tallas && tallas.length > 0) {
        for (const nombreTalla of tallas) {
          const tallaRegistro = await tx.talla.upsert({
            where: { nombre: nombreTalla.toUpperCase() },
            update: {},
            create: { nombre: nombreTalla.toUpperCase() },
          });
          await tx.talla_Producto.create({
            data: { tallaId: tallaRegistro.id, productoId: created.id },
          });
        }
      }

      return tx.producto.findUnique({
        where: { id: created.id },
        include: {
          colores: true,
          tallas: { include: { talla: true } },
          categoria: true,
          marca: true,
        },
      });
    }) as unknown as Product;
  }

  async findAll(page?: number, limit?: number): Promise<{ data: Product[]; total: number }> {
    const skip = (page && limit) ? (page - 1) * limit : undefined;
    const take = limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.producto.findMany({
        skip,
        take,
        include: {
          categoria: true,
          marca: true,
        },
      }),
      this.prisma.producto.count(),
    ]);

    return {
      data: data as unknown as Product[],
      total,
    };
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
      },
    }) as unknown as Product | null;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const { color, tallas, ...productoData } = product;
    return this.prisma.producto.update({
      where: { id },
      data: productoData as any,
    }) as unknown as Product;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.producto.delete({ where: { id } });
  }
}
