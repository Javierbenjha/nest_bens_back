import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryRepository } from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    return this.prisma.categoria.create({ data: category }) as unknown as Category;
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.categoria.findMany() as unknown as Category[];
  }

  async findById(id: number): Promise<Category | null> {
    return this.prisma.categoria.findUnique({ where: { id } }) as unknown as Category | null;
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    return this.prisma.categoria.update({
      where: { id },
      data: category,
    }) as unknown as Category;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.categoria.delete({ where: { id } });
  }
}
