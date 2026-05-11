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
exports.PrismaOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaOrderRepository = class PrismaOrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(order) {
        return this.prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                const inv = await tx.inventario.findFirst({
                    where: {
                        productoId: item.productoId,
                        tallaId: item.tallaId,
                        colorId: item.colorId,
                    },
                });
                if (!inv) {
                    throw new common_1.BadRequestException(`No existe registro de inventario para el producto ${item.productoId}`);
                }
                if (inv.stock < item.cantidad) {
                    throw new common_1.BadRequestException(`Stock insuficiente para el producto ${item.productoId}. Disponible: ${inv.stock}, solicitado: ${item.cantidad}`);
                }
            }
            const savedOrder = await tx.pedido.create({
                data: {
                    clienteId: order.clienteId,
                    usuarioId: order.usuarioId,
                    cuponId: order.cuponId,
                    subtotal: order.subtotal,
                    impuesto: order.impuesto,
                    descuento: order.descuento,
                    descuentoCupon: order.descuentoCupon,
                    total: order.total,
                    medioPagoId: order.medioPagoId,
                    tipoComprobanteId: order.tipoComprobanteId,
                    direccionEnvio: order.direccionEnvio,
                    observaciones: order.observaciones,
                    origen: order.origen,
                    fechaEntrega: order.fechaEntrega ? new Date(order.fechaEntrega) : null,
                    detalles: {
                        create: order.items.map((item) => ({
                            productoId: item.productoId,
                            tallaId: item.tallaId,
                            colorId: item.colorId,
                            cantidad: item.cantidad,
                            precioUnitario: item.precioUnitario,
                            descuento: item.descuento,
                            subtotal: item.subtotal,
                        })),
                    },
                },
            });
            for (const item of order.items) {
                const inv = await tx.inventario.findFirst({
                    where: {
                        productoId: item.productoId,
                        tallaId: item.tallaId,
                        colorId: item.colorId,
                    },
                });
                const stockAntes = inv.stock;
                const stockDespues = stockAntes - item.cantidad;
                await tx.inventario.update({
                    where: { id: inv.id },
                    data: { stock: stockDespues },
                });
                await tx.movimientoInventario.create({
                    data: {
                        inventarioId: inv.id,
                        tipo: 'EGRESO',
                        cantidad: item.cantidad,
                        stockAntes,
                        stockDespues,
                        referencia: `PEDIDO-${savedOrder.id}`,
                    },
                });
            }
            if (order.cuponId) {
                await tx.cupon.update({
                    where: { id: order.cuponId },
                    data: { usosActuales: { increment: 1 } },
                });
            }
            return tx.pedido.findUnique({
                where: { id: savedOrder.id },
                include: {
                    cliente: true,
                    medioPago: true,
                    tipoComprobante: true,
                    cupon: true,
                    detalles: {
                        include: { producto: true, talla: true, color: true },
                    },
                },
            });
        });
    }
    async findById(id) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: {
                cliente: true,
                medioPago: true,
                tipoComprobante: true,
                cupon: true,
                detalles: {
                    include: { producto: true, talla: true, color: true },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.pedido.findMany({
            include: {
                cliente: true,
                medioPago: true,
                tipoComprobante: true,
                cupon: true,
                detalles: {
                    include: { producto: true, talla: true, color: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async confirmPayment(id, medioPagoId, tipoComprobanteId) {
        return this.prisma.$transaction(async (tx) => {
            const pedido = await tx.pedido.findUnique({
                where: { id },
                include: { detalles: true },
            });
            if (!pedido)
                throw new common_1.NotFoundException(`Pedido ${id} no encontrado`);
            if (pedido.estado === 'PAGADO')
                throw new common_1.ConflictException(`El pedido ${id} ya fue pagado`);
            if (pedido.estado === 'CANCELADO')
                throw new common_1.ConflictException(`El pedido ${id} está cancelado`);
            const updated = await tx.pedido.update({
                where: { id },
                data: {
                    estado: 'PAGADO',
                    estadoPago: 'PAGADO',
                    medioPagoId,
                    ...(tipoComprobanteId && { tipoComprobanteId }),
                },
                include: {
                    detalles: { include: { producto: true, talla: true, color: true } },
                    medioPago: true,
                    tipoComprobante: true,
                    cliente: true,
                    cupon: true,
                },
            });
            await tx.venta.create({ data: { pedidoId: id } });
            return updated;
        });
    }
    async findByUsuarioId(usuarioId) {
        return this.prisma.pedido.findMany({
            where: { cliente: { usuarioId } },
            include: {
                detalles: { include: { producto: true, talla: true, color: true } },
                medioPago: true,
                cupon: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async cancel(id) {
        return this.prisma.$transaction(async (tx) => {
            const pedido = await tx.pedido.findUnique({
                where: { id },
                include: { detalles: true },
            });
            if (!pedido)
                throw new common_1.NotFoundException(`Pedido ${id} no encontrado`);
            if (pedido.estado === 'CANCELADO')
                throw new common_1.ConflictException(`El pedido ${id} ya está cancelado`);
            if (pedido.estado === 'ENTREGADO')
                throw new common_1.ConflictException(`No se puede cancelar un pedido ya entregado`);
            if (pedido.estado === 'PAGADO')
                throw new common_1.ConflictException(`No se puede cancelar un pedido pagado. Emite una devolución`);
            const updated = await tx.pedido.update({
                where: { id },
                data: { estado: 'CANCELADO', estadoPago: 'FALLIDO' },
                include: {
                    detalles: { include: { producto: true, talla: true, color: true } },
                    medioPago: true,
                    tipoComprobante: true,
                    cliente: true,
                    cupon: true,
                },
            });
            for (const item of pedido.detalles) {
                const inv = await tx.inventario.findFirst({
                    where: {
                        productoId: item.productoId,
                        tallaId: item.tallaId ?? undefined,
                        colorId: item.colorId ?? undefined,
                    },
                });
                if (inv) {
                    const stockAntes = inv.stock;
                    const stockDespues = stockAntes + item.cantidad;
                    await tx.inventario.update({
                        where: { id: inv.id },
                        data: { stock: stockDespues },
                    });
                    await tx.movimientoInventario.create({
                        data: {
                            inventarioId: inv.id,
                            tipo: 'DEVOLUCION',
                            cantidad: item.cantidad,
                            stockAntes,
                            stockDespues,
                            referencia: `CANCELACION-PEDIDO-${id}`,
                        },
                    });
                }
            }
            return updated;
        });
    }
};
exports.PrismaOrderRepository = PrismaOrderRepository;
exports.PrismaOrderRepository = PrismaOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaOrderRepository);
//# sourceMappingURL=prisma-order.repository.js.map