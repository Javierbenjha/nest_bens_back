import { PrismaService } from 'src/prisma/prisma.service';
import { ProductFilters, ProductRepository } from '../../domain/product.repository';
import { Product } from '../../domain/product.entity';
export declare class PrismaProductRepository implements ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(product: Product): Promise<Product>;
    findAll(filters?: ProductFilters): Promise<{
        data: Product[];
        total: number;
    }>;
    findById(id: number): Promise<Product | null>;
    update(id: number, product: Partial<Product>): Promise<Product>;
    findManyByIds(ids: number[]): Promise<Product[]>;
    delete(id: number): Promise<void>;
}
