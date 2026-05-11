import type { ItemRepository } from '../domain/item.repository';
import type { Item } from '../domain/item.entity';
export declare class ItemsService {
    private readonly repo;
    constructor(repo: ItemRepository);
    create(item: Partial<Item>): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item | null>;
    update(id: number, item: Partial<Item>): Promise<Item>;
    remove(id: number): Promise<void>;
}
