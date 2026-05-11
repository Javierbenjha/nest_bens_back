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
exports.ProductionController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const production_service_1 = require("../../application/production.service");
const create_production_order_dto_1 = require("./dto/create-production-order.dto");
const complete_production_order_dto_1 = require("./dto/complete-production-order.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let ProductionController = class ProductionController {
    productionService;
    constructor(productionService) {
        this.productionService = productionService;
    }
    create(dto, req) {
        return this.productionService.create({
            ...dto,
            cantidadProducida: 0,
            estado: 'PENDIENTE',
            usuarioId: req.user.userId,
        });
    }
    findAll() {
        return this.productionService.findAll();
    }
    findOne(id) {
        return this.productionService.findOne(id);
    }
    start(id) {
        return this.productionService.start(id);
    }
    complete(id, dto) {
        return this.productionService.complete(id, dto.cantidadProducida);
    }
    cancel(id) {
        return this.productionService.cancel(id);
    }
};
exports.ProductionController = ProductionController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../domain/production-order.entity").ProductionOrder }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_production_order_dto_1.CreateProductionOrderDto, Object]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/production-order.entity").ProductionOrder] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/production-order.entity").ProductionOrder }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/production-order.entity").ProductionOrder }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "start", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/production-order.entity").ProductionOrder }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, complete_production_order_dto_1.CompleteProductionOrderDto]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "complete", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/production-order.entity").ProductionOrder }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductionController.prototype, "cancel", null);
exports.ProductionController = ProductionController = __decorate([
    (0, swagger_1.ApiTags)('Production'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('production'),
    __metadata("design:paramtypes", [production_service_1.ProductionService])
], ProductionController);
//# sourceMappingURL=production.controller.js.map