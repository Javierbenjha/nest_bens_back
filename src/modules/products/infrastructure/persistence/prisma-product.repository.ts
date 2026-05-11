import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductFilters, ProductRepository } from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const { color, tallas, ...productoData } = product;

    return this.prisma.$transaction(async (tx) => {
      const created = await tx.producto.create({ data: productoData as any });

      if (color && color.length > 0) {
        for (const nombreColor of color) {
          const colorRecord = await tx.color.create({
            data: { nombre: nombreColor, productoId: created.id },
          });

          if (tallas && tallas.length > 0) {
            for (const nombreTalla of tallas) {
              const tallaRegistro = await tx.talla.upsert({
                where: { nombre: nombreTalla.toUpperCase() },
                update: {},
                create: { nombre: nombreTalla.toUpperCase() },
              });

              await tx.inventario.create({
                data: {
                  productoId: created.id,
                  colorId: colorRecord.id,
                  tallaId: tallaRegistro.id,
                  stock: 0,
                  precio: created.precio,
                },
              });
            }
          }
        }
      }

      return tx.producto.findUnique({
        where: { id: created.id },
        include: {
          colores: true,
          inventarios: {
            include: {
              talla: true,
              color: true,
            },
          },
          categoria: true,
          marca: true,
        },
      });
    }) as unknown as Product;
  }

  async findAll(filters: ProductFilters = {}): Promise<{ data: Product[]; total: number }> {
    const { page, limit, nombre, categoriaId, marcaId, precioMin, precioMax, tallaId, colorId } = filters;
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit;

    const where = {
      ...(nombre && { nombre: { contains: nombre } }),
      ...(categoriaId && { categoriaId }),
      ...(marcaId && { marcaId }),
      ...(precioMin !== undefined || precioMax !== undefined
        ? { precio: { gte: precioMin, lte: precioMax } }
        : {}),
      ...(tallaId || colorId
        ? { inventarios: { some: { ...(tallaId && { tallaId }), ...(colorId && { colorId }) } } }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.producto.findMany({
        where,
        skip,
        take,
        include: {
          categoria: true,
          marca: true,
          colores: true,
          inventarios: { include: { talla: true, color: true } },
        },
      }),
      this.prisma.producto.count({ where }),
    ]);

    return { data: data as unknown as Product[], total };
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
        inventarios: {
          include: { talla: true, color: true },
        },
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

  async findManyByIds(ids: number[]): Promise<Product[]> {
    return this.prisma.producto.findMany({
      where: { id: { in: ids } },
    }) as unknown as Product[];
  }

  async delete(id: number): Promise<void> {
    await this.prisma.producto.delete({ where: { id } });
  }
}
