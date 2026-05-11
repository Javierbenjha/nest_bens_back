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
exports.InventoryController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("../../application/inventory.service");
const create_inventory_dto_1 = require("./dto/create-inventory.dto");
const update_inventory_dto_1 = require("./dto/update-inventory.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../../../common/decorators/public.decorator");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    create(dto) {
        return this.inventoryService.create(dto);
    }
    findAll() {
        return this.inventoryService.findAll();
    }
    findLowStock() {
        return this.inventoryService.findLowStock();
    }
    findByProduct(id) {
        return this.inventoryService.findByProduct(+id);
    }
    findOne(id) {
        return this.inventoryService.findOne(+id);
    }
    getMovements(id) {
        return this.inventoryService.getMovements(+id);
    }
    update(id, dto) {
        return this.inventoryService.update(+id, dto.stock, dto.stockMinimo, dto.precio);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../domain/inventory.entity").Inventory }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/inventory.entity").Inventory] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/inventory.entity").Inventory] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findLowStock", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('product/:productoId'),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/inventory.entity").Inventory] }),
    __param(0, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/inventory.entity").Inventory }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/movements'),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/stock-movement.entity").StockMovement] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getMovements", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/inventory.entity").Inventory }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_inventory_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "update", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map