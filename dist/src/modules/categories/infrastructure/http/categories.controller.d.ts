import { CategoriesService } from '../../application/categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("../../domain/category.entity").Category>;
    findAll(): Promise<import("../../domain/category.entity").Category[]>;
    findOne(id: string): Promise<import("../../domain/category.entity").Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("../../domain/category.entity").Category>;
    remove(id: string): Promise<void>;
}
