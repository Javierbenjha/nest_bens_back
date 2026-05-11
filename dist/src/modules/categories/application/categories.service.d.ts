import type { CategoryRepository } from '../domain/category.repository';
import type { Category } from '../domain/category.entity';
export declare class CategoriesService {
    private readonly repo;
    constructor(repo: CategoryRepository);
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    update(id: number, category: Partial<Category>): Promise<Category>;
    remove(id: number): Promise<void>;
}
