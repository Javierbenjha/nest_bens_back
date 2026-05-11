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
exports.PrismaSizeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaSizeRepository = class PrismaSizeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(size) {
        return this.prisma.talla.create({ data: size });
    }
    async findAll() {
        return this.prisma.talla.findMany({
            orderBy: { id: 'asc' },
        });
    }
    async findById(id) {
        return this.prisma.talla.findUnique({ where: { id } });
    }
    async update(id, size) {
        return this.prisma.talla.update({
            where: { id },
            data: size,
        });
    }
    async delete(id) {
        await this.prisma.talla.delete({ where: { id } });
    }
};
exports.PrismaSizeRepository = PrismaSizeRepository;
exports.PrismaSizeRepository = PrismaSizeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSizeRepository);
//# sourceMappingURL=prisma-size.repository.js.map