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
exports.LogisticsService = void 0;
const common_1 = require("@nestjs/common");
let LogisticsService = class LogisticsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findPending() {
        return this.repo.findPending();
    }
    findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const logistic = await this.repo.findById(id);
        if (!logistic)
            throw new common_1.NotFoundException(`Pedido con ID ${id} no encontrado`);
        return logistic;
    }
    async dispatch(id) {
        const logistic = await this.repo.findById(id);
        if (!logistic)
            throw new common_1.NotFoundException(`Pedido con ID ${id} no encontrado`);
        if (logistic.estado !== 'PAGADO') {
            throw new common_1.BadRequestException(`Solo se pueden despachar pedidos en estado PAGADO. Estado actual: ${logistic.estado}`);
        }
        return this.repo.dispatch(id);
    }
    async deliver(id, data) {
        const logistic = await this.repo.findById(id);
        if (!logistic)
            throw new common_1.NotFoundException(`Pedido con ID ${id} no encontrado`);
        if (logistic.estado !== 'PAGADO' && logistic.estado !== 'EN_CAMINO') {
            throw new common_1.BadRequestException(`Solo se pueden entregar pedidos en estado PAGADO o EN_CAMINO. Estado actual: ${logistic.estado}`);
        }
        return this.repo.deliver(id, data);
    }
};
exports.LogisticsService = LogisticsService;
exports.LogisticsService = LogisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('LogisticRepository')),
    __metadata("design:paramtypes", [Object])
], LogisticsService);
//# sourceMappingURL=logistics.service.js.map