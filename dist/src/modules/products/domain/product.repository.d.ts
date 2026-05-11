import { Product } from './product.entity';
export interface ProductFilters {
    page?: number;
    limit?: number;
    nombre?: string;
    categoriaId?: number;
    marcaId?: number;
    precioMin?: number;
    precioMax?: number;
    tallaId?: number;
    colorId?: number;
}
export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(filters?: ProductFilters): Promise<{
        data: Product[];
        total: number;
    }>;
    findById(id: number): Promise<Product | null>;
    findManyByIds(ids: number[]): Promise<Product[]>;
    update(id: number, product: Partial<Product>): Promise<Product>;
    delete(id: number): Promise<void>;
}
