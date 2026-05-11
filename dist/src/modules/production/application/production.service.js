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
exports.ProductionService = void 0;
const common_1 = require("@nestjs/common");
let ProductionService = class ProductionService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(data) {
        return this.repo.create(data);
    }
    findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const order = await this.repo.findById(id);
        if (!order)
            throw new common_1.NotFoundException(`Orden de producción con ID ${id} no encontrada`);
        return order;
    }
    async start(id) {
        const order = await this.repo.findById(id);
        if (!order)
            throw new common_1.NotFoundException(`Orden de producción con ID ${id} no encontrada`);
        if (order.estado !== 'PENDIENTE') {
            throw new common_1.BadRequestException(`Solo se pueden iniciar órdenes en estado PENDIENTE. Estado actual: ${order.estado}`);
        }
        return this.repo.start(id);
    }
    async complete(id, cantidadProducida) {
        const order = await this.repo.findById(id);
        if (!order)
            throw new common_1.NotFoundException(`Orden de producción con ID ${id} no encontrada`);
        if (order.estado !== 'EN_PROCESO') {
            throw new common_1.BadRequestException(`Solo se pueden completar órdenes en estado EN_PROCESO. Estado actual: ${order.estado}`);
        }
        if (cantidadProducida <= 0) {
            throw new common_1.BadRequestException('La cantidad producida debe ser mayor a 0');
        }
        return this.repo.complete(id, cantidadProducida);
    }
    async cancel(id) {
        const order = await this.repo.findById(id);
        if (!order)
            throw new common_1.NotFoundException(`Orden de producción con ID ${id} no encontrada`);
        if (order.estado === 'COMPLETADO') {
            throw new common_1.BadRequestException('No se puede cancelar una orden ya completada');
        }
        if (order.estado === 'CANCELADO') {
            throw new common_1.BadRequestException('La orden ya está cancelada');
        }
        return this.repo.cancel(id);
    }
};
exports.ProductionService = ProductionService;
exports.ProductionService = ProductionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProductionOrderRepository')),
    __metadata("design:paramtypes", [Object])
], ProductionService);
//# sourceMappingURL=production.service.js.map