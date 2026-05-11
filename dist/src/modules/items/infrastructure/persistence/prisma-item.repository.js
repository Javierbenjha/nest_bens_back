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
exports.PrismaItemRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaItemRepository = class PrismaItemRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(item) {
        return this.prisma.articulo.create({
            data: {
                nombre: item.nombre,
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                precio: item.precio,
                unidad: item.unidad,
            },
        });
    }
    async findAll() {
        return this.prisma.articulo.findMany({
            include: { detallesCompra: true },
        });
    }
    async findById(id) {
        return this.prisma.articulo.findUnique({
            where: { id },
            include: { detallesCompra: true },
        });
    }
    async update(id, item) {
        return this.prisma.articulo.update({
            where: { id },
            data: {
                nombre: item.nombre,
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                precio: item.precio,
                unidad: item.unidad,
            },
        });
    }
    async delete(id) {
        await this.prisma.articulo.delete({ where: { id } });
    }
};
exports.PrismaItemRepository = PrismaItemRepository;
exports.PrismaItemRepository = PrismaItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaItemRepository);
//# sourceMappingURL=prisma-item.repository.js.map