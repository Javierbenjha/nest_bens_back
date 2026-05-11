import { PrismaService } from 'src/prisma/prisma.service';
import { SizeRepository } from '../../domain/size.repository';
import { Size } from '../../domain/size.entity';
export declare class PrismaSizeRepository implements SizeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(size: Size): Promise<Size>;
    findAll(): Promise<Size[]>;
    findById(id: number): Promise<Size | null>;
    update(id: number, size: Partial<Size>): Promise<Size>;
    delete(id: number): Promise<void>;
}
