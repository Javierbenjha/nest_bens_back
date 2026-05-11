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
exports.LogisticsController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const logistics_service_1 = require("../../application/logistics.service");
const deliver_order_dto_1 = require("./dto/deliver-order.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let LogisticsController = class LogisticsController {
    logisticsService;
    constructor(logisticsService) {
        this.logisticsService = logisticsService;
    }
    findPending() {
        return this.logisticsService.findPending();
    }
    findAll() {
        return this.logisticsService.findAll();
    }
    findOne(id) {
        return this.logisticsService.findOne(+id);
    }
    dispatch(id) {
        return this.logisticsService.dispatch(+id);
    }
    deliver(id, dto) {
        return this.logisticsService.deliver(+id, dto);
    }
};
exports.LogisticsController = LogisticsController;
__decorate([
    (0, common_1.Get)('pending'),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/logistic.entity").Logistic] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogisticsController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/logistic.entity").Logistic] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogisticsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':pedidoId'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/logistic.entity").Logistic }),
    __param(0, (0, common_1.Param)('pedidoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogisticsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('dispatch/:pedidoId'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/logistic.entity").Logistic }),
    __param(0, (0, common_1.Param)('pedidoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LogisticsController.prototype, "dispatch", null);
__decorate([
    (0, common_1.Patch)('deliver/:pedidoId'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/logistic.entity").Logistic }),
    __param(0, (0, common_1.Param)('pedidoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deliver_order_dto_1.DeliverOrderDto]),
    __metadata("design:returntype", void 0)
], LogisticsController.prototype, "deliver", null);
exports.LogisticsController = LogisticsController = __decorate([
    (0, swagger_1.ApiTags)('Logistics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('logistics'),
    __metadata("design:paramtypes", [logistics_service_1.LogisticsService])
], LogisticsController);
//# sourceMappingURL=logistics.controller.js.map