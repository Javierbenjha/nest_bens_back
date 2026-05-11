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
exports.PrismaRecipeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const RECIPE_INCLUDE = {
    producto: { select: { id: true, nombre: true } },
    articulo: { select: { id: true, nombre: true, unidad: true } },
};
let PrismaRecipeRepository = class PrismaRecipeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(recipe) {
        return this.prisma.producto_Articulo.create({
            data: {
                productoId: recipe.productoId,
                articuloId: recipe.articuloId,
                cantidad: recipe.cantidad,
            },
            include: RECIPE_INCLUDE,
        });
    }
    async findByProducto(productoId) {
        return this.prisma.producto_Articulo.findMany({
            where: { productoId },
            include: RECIPE_INCLUDE,
        });
    }
    async findById(id) {
        return this.prisma.producto_Articulo.findUnique({
            where: { id },
            include: RECIPE_INCLUDE,
        });
    }
    async update(id, cantidad) {
        return this.prisma.producto_Articulo.update({
            where: { id },
            data: { cantidad },
            include: RECIPE_INCLUDE,
        });
    }
    async delete(id) {
        await this.prisma.producto_Articulo.delete({ where: { id } });
    }
};
exports.PrismaRecipeRepository = PrismaRecipeRepository;
exports.PrismaRecipeRepository = PrismaRecipeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRecipeRepository);
//# sourceMappingURL=prisma-recipe.repository.js.map