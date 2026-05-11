import { InventoryService } from '../../application/inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(dto: CreateInventoryDto): Promise<import("../../domain/inventory.entity").Inventory>;
    findAll(): Promise<import("../../domain/inventory.entity").Inventory[]>;
    findLowStock(): Promise<import("../../domain/inventory.entity").Inventory[]>;
    findByProduct(id: string): Promise<import("../../domain/inventory.entity").Inventory[]>;
    findOne(id: string): Promise<import("../../domain/inventory.entity").Inventory>;
    getMovements(id: string): Promise<import("../../domain/stock-movement.entity").StockMovement[]>;
    update(id: string, dto: UpdateInventoryDto): Promise<import("../../domain/inventory.entity").Inventory>;
}
