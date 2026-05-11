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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLogisticRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const PEDIDO_INCLUDE = {
    cliente: true,
    medioPago: true,
    detalles: {
        include: { producto: true, talla: true, color: true },
    },
};
let PrismaLogisticRepository = class PrismaLogisticRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPending() {
        return this.prisma.pedido.findMany({
            where: { estado: 'PAGADO' },
            include: PEDIDO_INCLUDE,
            orderBy: { createdAt: 'asc' },
        });
    }
    async findAll() {
        return this.prisma.pedido.findMany({
            where: { estado: { in: ['EN_CAMINO', 'ENTREGADO'] } },
            include: PEDIDO_INCLUDE,
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: PEDIDO_INCLUDE,
        });
    }
    async dispatch(id) {
        return this.prisma.pedido.update({
            where: { id },
            data: { estado: 'EN_CAMINO' },
            include: PEDIDO_INCLUDE,
        });
    }
    async deliver(id, data) {
        return this.prisma.pedido.update({
            where: { id },
            data: {
                estado: 'ENTREGADO',
                fechaEntrega: data.fechaEntrega ? new Date(data.fechaEntrega) : new Date(),
                ...(data.direccionEnvio && { direccionEnvio: data.direccionEnvio }),
                ...(data.observaciones && { observaciones: data.observaciones }),
            },
            include: PEDIDO_INCLUDE,
        });
    }
};
exports.PrismaLogisticRepository = PrismaLogisticRepository;
exports.PrismaLogisticRepository = PrismaLogisticRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaLogisticRepository);
//# sourceMappingURL=prisma-logistic.repository.js.map