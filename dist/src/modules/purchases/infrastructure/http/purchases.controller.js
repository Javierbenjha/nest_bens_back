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
exports.PurchasesController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const purchases_service_1 = require("../../application/purchases.service");
const create_purchase_dto_1 = require("./dto/create-purchase.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let PurchasesController = class PurchasesController {
    purchasesService;
    constructor(purchasesService) {
        this.purchasesService = purchasesService;
    }
    create(createPurchaseDto) {
        return this.purchasesService.create(createPurchaseDto);
    }
    findAll() {
        return this.purchasesService.findAll();
    }
    findOne(id) {
        return this.purchasesService.findOne(+id);
    }
    anular(id) {
        return this.purchasesService.anular(+id);
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../domain/purchase.entity").Purchase }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/purchase.entity").Purchase] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/purchase.entity").Purchase }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/anular'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/purchase.entity").Purchase }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchasesController.prototype, "anular", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, swagger_1.ApiTags)('Purchases'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map