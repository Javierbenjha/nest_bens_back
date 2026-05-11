import { PrismaService } from 'src/prisma/prisma.service';
import { BrandRepository } from '../../domain/brand.repository';
import { Brand } from '../../domain/brand.entity';
export declare class PrismaBrandRepository implements BrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(brand: Brand): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findById(id: number): Promise<Brand | null>;
    update(id: number, brand: Partial<Brand>): Promise<Brand>;
    delete(id: number): Promise<void>;
}
