import { PrismaService } from 'src/prisma/prisma.service';
import { ItemRepository } from '../../domain/item.repository';
import { Item } from '../../domain/item.entity';
export declare class PrismaItemRepository implements ItemRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: Item): Promise<Item>;
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    update(id: number, item: Partial<Item>): Promise<Item>;
    delete(id: number): Promise<void>;
}
