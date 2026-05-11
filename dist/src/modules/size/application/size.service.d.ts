import type { SizeRepository } from '../domain/size.repository';
import type { Size } from '../domain/size.entity';
export declare class SizeService {
    private readonly repo;
    constructor(repo: SizeRepository);
    create(size: Partial<Size>): Promise<Size>;
    findAll(): Promise<Size[]>;
    findOne(id: number): Promise<Size | null>;
    update(id: number, size: Partial<Size>): Promise<Size>;
    remove(id: number): Promise<void>;
}
