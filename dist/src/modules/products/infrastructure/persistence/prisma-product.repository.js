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
exports.PrismaProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaProductRepository = class PrismaProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(product) {
        const { color, tallas, ...productoData } = product;
        return this.prisma.$transaction(async (tx) => {
            const created = await tx.producto.create({ data: productoData });
            if (color && color.length > 0) {
                for (const nombreColor of color) {
                    const colorRecord = await tx.color.create({
                        data: { nombre: nombreColor, productoId: created.id },
                    });
                    if (tallas && tallas.length > 0) {
                        for (const nombreTalla of tallas) {
                            const tallaRegistro = await tx.talla.upsert({
                                where: { nombre: nombreTalla.toUpperCase() },
                                update: {},
                                create: { nombre: nombreTalla.toUpperCase() },
                            });
                            await tx.inventario.create({
                                data: {
                                    productoId: created.id,
                                    colorId: colorRecord.id,
                                    tallaId: tallaRegistro.id,
                                    stock: 0,
                                    precio: created.precio,
                                },
                            });
                        }
                    }
                }
            }
            return tx.producto.findUnique({
                where: { id: created.id },
                include: {
                    colores: true,
                    inventarios: {
                        include: {
                            talla: true,
                            color: true,
                        },
                    },
                    categoria: true,
                    marca: true,
                },
            });
        });
    }
    async findAll(filters = {}) {
        const { page, limit, nombre, categoriaId, marcaId, precioMin, precioMax, tallaId, colorId } = filters;
        const skip = page && limit ? (page - 1) * limit : undefined;
        const take = limit;
        const where = {
            ...(nombre && { nombre: { contains: nombre } }),
            ...(categoriaId && { categoriaId }),
            ...(marcaId && { marcaId }),
            ...(precioMin !== undefined || precioMax !== undefined
                ? { precio: { gte: precioMin, lte: precioMax } }
                : {}),
            ...(tallaId || colorId
                ? { inventarios: { some: { ...(tallaId && { tallaId }), ...(colorId && { colorId }) } } }
                : {}),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.producto.findMany({
                where,
                skip,
                take,
                include: {
                    categoria: true,
                    marca: true,
                    colores: true,
                    inventarios: { include: { talla: true, color: true } },
                },
            }),
            this.prisma.producto.count({ where }),
        ]);
        return { data: data, total };
    }
    async findById(id) {
        return this.prisma.producto.findUnique({
            where: { id },
            include: {
                categoria: true,
                marca: true,
                inventarios: {
                    include: { talla: true, color: true },
                },
            },
        });
    }
    async update(id, product) {
        const { color, tallas, ...productoData } = product;
        return this.prisma.producto.update({
            where: { id },
            data: productoData,
        });
    }
    async findManyByIds(ids) {
        return this.prisma.producto.findMany({
            where: { id: { in: ids } },
        });
    }
    async delete(id) {
        await this.prisma.producto.delete({ where: { id } });
    }
};
exports.PrismaProductRepository = PrismaProductRepository;
exports.PrismaProductRepository = PrismaProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProductRepository);
//# sourceMappingURL=prisma-product.repository.js.map