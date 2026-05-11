import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryRepository } from '../../domain/category.repository';
import { Category } from '../../domain/category.entity';
export declare class PrismaCategoryRepository implements CategoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
    update(id: number, category: Partial<Category>): Promise<Category>;
    delete(id: number): Promise<void>;
}
