import type { BrandRepository } from '../domain/brand.repository';
import type { Brand } from '../domain/brand.entity';
export declare class BrandService {
    private readonly repo;
    constructor(repo: BrandRepository);
    create(brand: Partial<Brand>): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: number): Promise<Brand | null>;
    update(id: number, brand: Partial<Brand>): Promise<Brand>;
    remove(id: number): Promise<void>;
}
