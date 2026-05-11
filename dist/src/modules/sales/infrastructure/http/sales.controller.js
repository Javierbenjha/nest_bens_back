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
exports.SalesController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const sales_service_1 = require("../../application/sales.service");
const create_sale_dto_1 = require("./dto/create-sale.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let SalesController = class SalesController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    create(createSaleDto) {
        return this.salesService.createFromOrder(createSaleDto.pedidoId);
    }
    createFromOrder(pedidoId) {
        return this.salesService.createFromOrder(+pedidoId);
    }
    findAll() {
        return this.salesService.findAll();
    }
    findOne(id) {
        return this.salesService.findOne(+id);
    }
    remove(id) {
        return this.salesService.remove(+id);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../domain/sale.entity").Sale }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('from-order/:pedidoId'),
    openapi.ApiResponse({ status: 201, type: require("../../domain/sale.entity").Sale }),
    __param(0, (0, common_1.Param)('pedidoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createFromOrder", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/sale.entity").Sale] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/sale.entity").Sale }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "remove", null);
exports.SalesController = SalesController = __decorate([
    (0, swagger_1.ApiTags)('Sales'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map