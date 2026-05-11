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
exports.PrismaPurchaseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaPurchaseRepository = class PrismaPurchaseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(purchase) {
        return this.prisma.$transaction(async (tx) => {
            const total = purchase.detalles.reduce((sum, d) => sum + d.cantidad * d.precio, 0);
            const compra = await tx.compra.create({
                data: { tipo: purchase.tipo, proveedorId: purchase.proveedorId, total },
            });
            if (purchase.tipo === 'PRODUCTO') {
                for (const detalle of purchase.detalles) {
                    await tx.detalle_Compra.create({
                        data: {
                            compraId: compra.id,
                            productoId: detalle.productoId,
                            tallaId: detalle.tallaId ?? null,
                            colorId: detalle.colorId ?? null,
                            cantidad: detalle.cantidad,
                            precio: detalle.precio,
                            subtotal: detalle.cantidad * detalle.precio,
                        },
                    });
                    const inv = await tx.inventario.findFirst({
                        where: {
                            productoId: detalle.productoId,
                            ...(detalle.tallaId != null && { tallaId: detalle.tallaId }),
                            ...(detalle.colorId != null && { colorId: detalle.colorId }),
                        },
                    });
                    if (inv) {
                        const stockAntes = inv.stock;
                        const stockDespues = stockAntes + detalle.cantidad;
                        await tx.inventario.update({
                            where: { id: inv.id },
                            data: { stock: stockDespues },
                        });
                        await tx.movimientoInventario.create({
                            data: {
                                inventarioId: inv.id,
                                tipo: 'INGRESO',
                                cantidad: detalle.cantidad,
                                stockAntes,
                                stockDespues,
                                referencia: `COMPRA-${compra.id}`,
                            },
                        });
                    }
                }
            }
            else {
                for (const detalle of purchase.detalles) {
                    await tx.detalle_Compra_Articulo.create({
                        data: {
                            compraId: compra.id,
                            articuloId: detalle.articuloId,
                            cantidad: detalle.cantidad,
                            precio: detalle.precio,
                            subtotal: detalle.cantidad * detalle.precio,
                        },
                    });
                    await tx.articulo.update({
                        where: { id: detalle.articuloId },
                        data: { cantidad: { increment: detalle.cantidad } },
                    });
                }
            }
            return tx.compra.findUnique({
                where: { id: compra.id },
                include: {
                    proveedor: true,
                    detalles: { include: { producto: true, talla: true, color: true } },
                    detallesArticulo: { include: { articulo: true } },
                },
            });
        });
    }
    async findAll() {
        return this.prisma.compra.findMany({
            include: {
                proveedor: true,
                detalles: { include: { producto: true, talla: true, color: true } },
                detallesArticulo: { include: { articulo: true } },
            },
        });
    }
    async findById(id) {
        return this.prisma.compra.findUnique({
            where: { id },
            include: {
                proveedor: true,
                detalles: { include: { producto: true, talla: true, color: true } },
                detallesArticulo: { include: { articulo: true } },
            },
        });
    }
    async anular(id) {
        return this.prisma.$transaction(async (tx) => {
            const compra = await tx.compra.findUnique({
                where: { id },
                include: { detalles: true, detallesArticulo: true },
            });
            if (!compra)
                throw new common_1.NotFoundException(`Compra ${id} no encontrada`);
            if (compra.estado === 'ANULADO')
                throw new Error(`La compra ${id} ya está anulada`);
            if (compra.tipo === 'PRODUCTO') {
                for (const detalle of compra.detalles) {
                    const inv = await tx.inventario.findFirst({
                        where: {
                            productoId: detalle.productoId,
                            ...(detalle.tallaId && { tallaId: detalle.tallaId }),
                            ...(detalle.colorId && { colorId: detalle.colorId }),
                        },
                    });
                    if (inv) {
                        const stockAntes = inv.stock;
                        const stockDespues = Math.max(0, stockAntes - detalle.cantidad);
                        await tx.inventario.update({
                            where: { id: inv.id },
                            data: { stock: stockDespues },
                        });
                        await tx.movimientoInventario.create({
                            data: {
                                inventarioId: inv.id,
                                tipo: 'EGRESO',
                                cantidad: detalle.cantidad,
                                stockAntes,
                                stockDespues,
                                referencia: `ANULACION-COMPRA-${id}`,
                            },
                        });
                    }
                }
            }
            if (compra.tipo === 'ARTICULO') {
                for (const detalle of compra.detallesArticulo) {
                    await tx.articulo.update({
                        where: { id: detalle.articuloId },
                        data: { cantidad: { decrement: detalle.cantidad } },
                    });
                }
            }
            return tx.compra.update({
                where: { id },
                data: { estado: 'ANULADO' },
                include: {
                    proveedor: true,
                    detalles: { include: { producto: true, talla: true, color: true } },
                    detallesArticulo: { include: { articulo: true } },
                },
            });
        });
    }
    async delete(id) {
        await this.prisma.$transaction(async (tx) => {
            const compra = await tx.compra.findUnique({
                where: { id },
                include: { detalles: true, detallesArticulo: true },
            });
            if (!compra)
                throw new common_1.NotFoundException(`Compra ${id} no encontrada`);
            if (compra.tipo === 'PRODUCTO') {
                for (const detalle of compra.detalles) {
                    const inv = await tx.inventario.findFirst({
                        where: {
                            productoId: detalle.productoId,
                            ...(detalle.tallaId && { tallaId: detalle.tallaId }),
                            ...(detalle.colorId && { colorId: detalle.colorId }),
                        },
                    });
                    if (inv) {
                        const stockAntes = inv.stock;
                        const stockDespues = Math.max(0, stockAntes - detalle.cantidad);
                        await tx.inventario.update({
                            where: { id: inv.id },
                            data: { stock: stockDespues },
                        });
                        await tx.movimientoInventario.create({
                            data: {
                                inventarioId: inv.id,
                                tipo: 'EGRESO',
                                cantidad: detalle.cantidad,
                                stockAntes,
                                stockDespues,
                                referencia: `ANULACION-COMPRA-${id}`,
                            },
                        });
                    }
                }
            }
            if (compra.tipo === 'ARTICULO') {
                for (const detalle of compra.detallesArticulo) {
                    await tx.articulo.update({
                        where: { id: detalle.articuloId },
                        data: { cantidad: { decrement: detalle.cantidad } },
                    });
                }
            }
            await tx.compra.delete({ where: { id } });
        });
    }
};
exports.PrismaPurchaseRepository = PrismaPurchaseRepository;
exports.PrismaPurchaseRepository = PrismaPurchaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPurchaseRepository);
//# sourceMappingURL=prisma-purchase.repository.js.map