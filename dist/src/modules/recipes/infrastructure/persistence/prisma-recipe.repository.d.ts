import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeRepository } from '../../domain/recipe.repository';
import { Recipe } from '../../domain/recipe.entity';
export declare class PrismaRecipeRepository implements RecipeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(recipe: Recipe): Promise<Recipe>;
    findByProducto(productoId: number): Promise<Recipe[]>;
    findById(id: number): Promise<Recipe | null>;
    update(id: number, cantidad: number): Promise<Recipe>;
    delete(id: number): Promise<void>;
}
