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
exports.PrismaSaleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const VENTA_INCLUDE = {
    pedido: {
        include: {
            cliente: true,
            medioPago: true,
            detalles: {
                include: { producto: true, talla: true, color: true },
            },
        },
    },
};
let PrismaSaleRepository = class PrismaSaleRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPedidoById(pedidoId) {
        return this.prisma.pedido.findUnique({
            where: { id: pedidoId },
            select: { estado: true },
        });
    }
    async findByPedidoId(pedidoId) {
        return this.prisma.venta.findUnique({ where: { pedidoId } });
    }
    async save(pedidoId) {
        return this.prisma.venta.create({
            data: { pedidoId },
            include: VENTA_INCLUDE,
        });
    }
    async findAll() {
        return this.prisma.venta.findMany({ include: VENTA_INCLUDE });
    }
    async findById(id) {
        return this.prisma.venta.findUnique({
            where: { id },
            include: VENTA_INCLUDE,
        });
    }
    async delete(id) {
        await this.prisma.$transaction(async (tx) => {
            const venta = await tx.venta.findUnique({ where: { id } });
            if (!venta)
                throw new common_1.NotFoundException(`Venta con ID ${id} no encontrada`);
            await tx.pedido.update({
                where: { id: venta.pedidoId },
                data: { estado: 'PENDIENTE', estadoPago: 'PENDIENTE' },
            });
            await tx.venta.delete({ where: { id } });
        });
    }
};
exports.PrismaSaleRepository = PrismaSaleRepository;
exports.PrismaSaleRepository = PrismaSaleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSaleRepository);
//# sourceMappingURL=prisma-sale.repository.js.map