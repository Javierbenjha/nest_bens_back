import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandRepository } from '../../domain/brand.repository';
import { Brand } from '../../domain/brand.entity';

@Injectable()
export class PrismaBrandRepository implements BrandRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(brand: Brand): Promise<Brand> {
    return this.prisma.marca.create({ data: brand }) as unknown as Brand;
  }

  async findAll(): Promise<Brand[]> {
    return this.prisma.marca.findMany() as unknown as Brand[];
  }

  async findById(id: number): Promise<Brand | null> {
    return this.prisma.marca.findUnique({ where: { id } }) as unknown as Brand | null;
  }

  async update(id: number, brand: Partial<Brand>): Promise<Brand> {
    return this.prisma.marca.update({
      where: { id },
      data: brand,
    }) as unknown as Brand;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.marca.delete({ where: { id } });
  }
}
