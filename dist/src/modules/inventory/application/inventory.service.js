"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
let InventoryService = class InventoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        try {
            return await this.repo.create(data);
        }
        catch {
            throw new common_1.ConflictException('Ya existe un registro de inventario para esa combinación producto/color/talla');
        }
    }
    findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const inv = await this.repo.findById(id);
        if (!inv)
            throw new common_1.NotFoundException(`Inventario con ID ${id} no encontrado`);
        return inv;
    }
    findByProduct(productoId) {
        return this.repo.findByProduct(productoId);
    }
    findLowStock() {
        return this.repo.findLowStock();
    }
    async update(id, stock, stockMinimo, precio) {
        const inv = await this.findOne(id);
        if (stock < 0)
            throw new common_1.BadRequestException('El stock no puede ser negativo');
        const updated = await this.repo.update(id, stock, stockMinimo, precio);
        if (stock !== inv.stock) {
            await this.repo.logMovement({
                inventarioId: id,
                tipo: stock > inv.stock ? 'INGRESO' : 'EGRESO',
                cantidad: Math.abs(stock - inv.stock),
                stockAntes: inv.stock,
                stockDespues: stock,
                referencia: 'AJUSTE-MANUAL',
            });
        }
        return updated;
    }
    getMovements(inventarioId) {
        return this.repo.getMovements(inventarioId);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('InventoryRepository')),
    __metadata("design:paramtypes", [Object])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map