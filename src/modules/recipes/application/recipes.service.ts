import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { RecipeRepository } from '../domain/recipe.repository';
import type { Recipe } from '../domain/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RecipeRepository')
    private readonly repo: RecipeRepository,
  ) {}

  create(data: Recipe): Promise<Recipe> {
    return this.repo.create(data);
  }

  findByProducto(productoId: number): Promise<Recipe[]> {
    return this.repo.findByProducto(productoId);
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.repo.findById(id);
    if (!recipe) throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    return recipe;
  }

  async update(id: number, cantidad: number): Promise<Recipe> {
    await this.findOne(id);
    return this.repo.update(id, cantidad);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
