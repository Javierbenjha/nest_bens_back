import type { ProductFilters, ProductRepository } from '../domain/product.repository';
import type { Product } from '../domain/product.entity';
export declare class ProductsService {
    private readonly repo;
    constructor(repo: ProductRepository);
    create(product: Partial<Product>): Promise<Product>;
    findAll(filters?: ProductFilters): Promise<{
        data: Product[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
            limit: number;
        };
    }>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, product: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<void>;
}
