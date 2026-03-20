import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categoria.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }

  findOne(id: number) {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.categoria.update({ where: { id }, data: updateCategoryDto });
  }

  remove(id: number) {
    return this.prisma.categoria.delete({ where: { id } });
  }
}
