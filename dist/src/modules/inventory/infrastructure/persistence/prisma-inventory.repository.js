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
exports.PrismaInventoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const INCLUDE = { producto: true, color: true, talla: true };
let PrismaInventoryRepository = class PrismaInventoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.inventario.create({
            data,
            include: INCLUDE,
        });
    }
    findAll() {
        return this.prisma.inventario.findMany({
            include: INCLUDE,
        });
    }
    findById(id) {
        return this.prisma.inventario.findUnique({
            where: { id },
            include: INCLUDE,
        });
    }
    findByProduct(productoId) {
        return this.prisma.inventario.findMany({
            where: { productoId },
            include: { color: true, talla: true },
        });
    }
    findLowStock() {
        return this.prisma.$queryRaw `
      SELECT i.*, p.nombre as productoNombre
      FROM Inventario i
      JOIN Producto p ON i.productoId = p.id
      WHERE i.stock <= i.stockMinimo
      ORDER BY (i.stock - i.stockMinimo) ASC
    `;
    }
    update(id, stock, stockMinimo, precio) {
        return this.prisma.inventario.update({
            where: { id },
            data: {
                stock,
                ...(stockMinimo !== undefined && { stockMinimo }),
                ...(precio !== undefined && { precio }),
            },
            include: INCLUDE,
        });
    }
    async logMovement(data) {
        return this.prisma.movimientoInventario.create({
            data,
        });
    }
    getMovements(inventarioId) {
        return this.prisma.movimientoInventario.findMany({
            where: { inventarioId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PrismaInventoryRepository = PrismaInventoryRepository;
exports.PrismaInventoryRepository = PrismaInventoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaInventoryRepository);
//# sourceMappingURL=prisma-inventory.repository.js.map