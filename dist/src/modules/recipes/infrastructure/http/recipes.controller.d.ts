import { RecipesService } from '../../application/recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(dto: CreateRecipeDto): Promise<import("../../domain/recipe.entity").Recipe>;
    findByProducto(productoId: number): Promise<import("../../domain/recipe.entity").Recipe[]>;
    findOne(id: number): Promise<import("../../domain/recipe.entity").Recipe>;
    update(id: number, dto: UpdateRecipeDto): Promise<import("../../domain/recipe.entity").Recipe>;
    remove(id: number): Promise<void>;
}
