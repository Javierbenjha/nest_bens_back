import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeRepository } from '../../domain/recipe.repository';
import { Recipe } from '../../domain/recipe.entity';

const RECIPE_INCLUDE = {
  producto: { select: { id: true, nombre: true } },
  articulo: { select: { id: true, nombre: true, unidad: true } },
};

@Injectable()
export class PrismaRecipeRepository implements RecipeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(recipe: Recipe): Promise<Recipe> {
    return this.prisma.producto_Articulo.create({
      data: {
        productoId: recipe.productoId,
        articuloId: recipe.articuloId,
        cantidad: recipe.cantidad,
      },
      include: RECIPE_INCLUDE,
    }) as unknown as Recipe;
  }

  async findByProducto(productoId: number): Promise<Recipe[]> {
    return this.prisma.producto_Articulo.findMany({
      where: { productoId },
      include: RECIPE_INCLUDE,
    }) as unknown as Recipe[];
  }

  async findById(id: number): Promise<Recipe | null> {
    return this.prisma.producto_Articulo.findUnique({
      where: { id },
      include: RECIPE_INCLUDE,
    }) as unknown as Recipe | null;
  }

  async update(id: number, cantidad: number): Promise<Recipe> {
    return this.prisma.producto_Articulo.update({
      where: { id },
      data: { cantidad },
      include: RECIPE_INCLUDE,
    }) as unknown as Recipe;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.producto_Articulo.delete({ where: { id } });
  }
}
