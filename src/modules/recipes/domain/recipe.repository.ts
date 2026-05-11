import { Recipe } from './recipe.entity';

export interface RecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;
  findByProducto(productoId: number): Promise<Recipe[]>;
  findById(id: number): Promise<Recipe | null>;
  update(id: number, cantidad: number): Promise<Recipe>;
  delete(id: number): Promise<void>;
}
