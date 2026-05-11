import type { InventoryRepository } from '../domain/inventory.repository';
export declare class InventoryService {
    private readonly repo;
    constructor(repo: InventoryRepository);
    create(data: {
        productoId: number;
        colorId: number;
        tallaId: number;
        stock: number;
        stockMinimo: number;
        precio: number;
    }): Promise<import("../domain/inventory.entity").Inventory>;
    findAll(): Promise<import("../domain/inventory.entity").Inventory[]>;
    findOne(id: number): Promise<import("../domain/inventory.entity").Inventory>;
    findByProduct(productoId: number): Promise<import("../domain/inventory.entity").Inventory[]>;
    findLowStock(): Promise<import("../domain/inventory.entity").Inventory[]>;
    update(id: number, stock: number, stockMinimo?: number, precio?: number): Promise<import("../domain/inventory.entity").Inventory>;
    getMovements(inventarioId: number): Promise<import("../domain/stock-movement.entity").StockMovement[]>;
}
