import { PrismaService } from 'src/prisma/prisma.service';
import { PurchaseRepository } from '../../domain/purchase.repository';
import { Purchase } from '../../domain/purchase.entity';
export declare class PrismaPurchaseRepository implements PurchaseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(purchase: Purchase): Promise<Purchase>;
    findAll(): Promise<Purchase[]>;
    findById(id: number): Promise<Purchase | null>;
    anular(id: number): Promise<Purchase>;
    delete(id: number): Promise<void>;
}
