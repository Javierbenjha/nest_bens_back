import type { RecipeRepository } from '../domain/recipe.repository';
import type { Recipe } from '../domain/recipe.entity';
export declare class RecipesService {
    private readonly repo;
    constructor(repo: RecipeRepository);
    create(data: Recipe): Promise<Recipe>;
    findByProducto(productoId: number): Promise<Recipe[]>;
    findOne(id: number): Promise<Recipe>;
    update(id: number, cantidad: number): Promise<Recipe>;
    remove(id: number): Promise<void>;
}
