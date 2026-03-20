import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SizeRepository } from '../../domain/size.repository';
import { Size } from '../../domain/size.entity';

@Injectable()
export class PrismaSizeRepository implements SizeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(size: Size): Promise<Size> {
    return this.prisma.talla.create({ data: size }) as unknown as Size;
  }

  async findAll(): Promise<Size[]> {
    return this.prisma.talla.findMany({
      orderBy: { id: 'asc' },
    }) as unknown as Size[];
  }

  async findById(id: number): Promise<Size | null> {
    return this.prisma.talla.findUnique({ where: { id } }) as unknown as Size | null;
  }

  async update(id: number, size: Partial<Size>): Promise<Size> {
    return this.prisma.talla.update({
      where: { id },
      data: size,
    }) as unknown as Size;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.talla.delete({ where: { id } });
  }
}
