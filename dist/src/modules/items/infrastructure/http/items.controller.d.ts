import { ItemsService } from '../../application/items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): Promise<import("../../domain/item.entity").Item>;
    findAll(): Promise<import("../../domain/item.entity").Item[]>;
    findOne(id: string): Promise<import("../../domain/item.entity").Item | null>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<import("../../domain/item.entity").Item>;
    remove(id: string): Promise<void>;
}
