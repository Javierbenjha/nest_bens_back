import type { SupplierRepository } from '../domain/supplier.repository';
import type { Supplier } from '../domain/supplier.entity';
export declare class SuppliersService {
    private readonly repo;
    constructor(repo: SupplierRepository);
    create(supplier: Partial<Supplier>): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findOne(id: number): Promise<Supplier | null>;
    update(id: number, supplier: Partial<Supplier>): Promise<Supplier>;
    remove(id: number): Promise<void>;
}
