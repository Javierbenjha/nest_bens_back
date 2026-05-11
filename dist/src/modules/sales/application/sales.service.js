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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
let SalesService = class SalesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createFromOrder(pedidoId) {
        const pedido = await this.repo.findPedidoById(pedidoId);
        if (!pedido)
            throw new common_1.NotFoundException(`Pedido con ID ${pedidoId} no encontrado`);
        const existing = await this.repo.findByPedidoId(pedidoId);
        if (existing)
            throw new common_1.ConflictException(`Ya existe una venta para el pedido ${pedidoId}`);
        if (pedido.estado !== 'PAGADO') {
            throw new common_1.ConflictException(`Solo se puede registrar venta para pedidos PAGADO. Estado actual: ${pedido.estado}`);
        }
        return this.repo.save(pedidoId);
    }
    findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const sale = await this.repo.findById(id);
        if (!sale)
            throw new common_1.NotFoundException(`Venta con ID ${id} no encontrada`);
        return sale;
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SaleRepository')),
    __metadata("design:paramtypes", [Object])
], SalesService);
//# sourceMappingURL=sales.service.js.map