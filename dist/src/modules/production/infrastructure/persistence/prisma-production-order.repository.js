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
exports.PrismaProductionOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const ORDER_INCLUDE = {
    producto: { select: { id: true, nombre: true } },
    talla: { select: { id: true, nombre: true } },
    color: { select: { id: true, nombre: true } },
    usuario: { select: { id: true, correo: true } },
};
let PrismaProductionOrderRepository = class PrismaProductionOrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(order) {
        return this.prisma.ordenProduccion.create({
            data: {
                productoId: order.productoId,
                tallaId: order.tallaId ?? null,
                colorId: order.colorId ?? null,
                cantidadPlanificada: order.cantidadPlanificada,
                cantidadProducida: 0,
                estado: 'PENDIENTE',
                usuarioId: order.usuarioId ?? null,
                observaciones: order.observaciones ?? null,
            },
            include: ORDER_INCLUDE,
        });
    }
    async findAll() {
        return this.prisma.ordenProduccion.findMany({
            include: ORDER_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return this.prisma.ordenProduccion.findUnique({
            where: { id },
            include: ORDER_INCLUDE,
        });
    }
    async start(id) {
        return this.prisma.ordenProduccion.update({
            where: { id },
            data: { estado: 'EN_PROCESO', fechaInicio: new Date() },
            include: ORDER_INCLUDE,
        });
    }
    async complete(id, cantidadProducida) {
        return this.prisma.$transaction(async (tx) => {
            const orden = await tx.ordenProduccion.findUnique({
                where: { id },
                include: {
                    producto: {
                        include: {
                            receta: { include: { articulo: true } },
                        },
                    },
                },
            });
            if (!orden)
                throw new common_1.NotFoundException(`Orden ${id} no encontrada`);
            for (const item of orden.producto.receta) {
                const necesario = Number(item.cantidad) * cantidadProducida;
                const disponible = Number(item.articulo.cantidad);
                if (disponible < necesario) {
                    throw new common_1.BadRequestException(`Material insuficiente: "${item.articulo.nombre}". ` +
                        `Disponible: ${disponible} ${item.articulo.unidad}, ` +
                        `necesario: ${necesario} ${item.articulo.unidad}`);
                }
            }
            for (const item of orden.producto.receta) {
                const necesario = Number(item.cantidad) * cantidadProducida;
                await tx.articulo.update({
                    where: { id: item.articuloId },
                    data: { cantidad: { decrement: necesario } },
                });
            }
            const inventario = await tx.inventario.findFirst({
                where: {
                    productoId: orden.productoId,
                    tallaId: orden.tallaId ?? undefined,
                    colorId: orden.colorId ?? undefined,
                },
            });
            if (inventario) {
                const stockAntes = inventario.stock;
                const stockDespues = stockAntes + cantidadProducida;
                await tx.inventario.update({
                    where: { id: inventario.id },
                    data: { stock: stockDespues },
                });
                await tx.movimientoInventario.create({
                    data: {
                        inventarioId: inventario.id,
                        tipo: 'INGRESO',
                        cantidad: cantidadProducida,
                        stockAntes,
                        stockDespues,
                        referencia: `PRODUCCION-${id}`,
                    },
                });
            }
            return tx.ordenProduccion.update({
                where: { id },
                data: {
                    cantidadProducida,
                    estado: 'COMPLETADO',
                    fechaFin: new Date(),
                },
                include: ORDER_INCLUDE,
            });
        });
    }
    async cancel(id) {
        return this.prisma.ordenProduccion.update({
            where: { id },
            data: { estado: 'CANCELADO' },
            include: ORDER_INCLUDE,
        });
    }
};
exports.PrismaProductionOrderRepository = PrismaProductionOrderRepository;
exports.PrismaProductionOrderRepository = PrismaProductionOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductionOrderRepository);
//# sourceMappingURL=prisma-production-order.repository.js.map