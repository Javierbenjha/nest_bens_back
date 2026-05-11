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
exports.PrismaAddressRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaAddressRepository = class PrismaAddressRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findClienteIdByUsuarioId(usuarioId) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { usuarioId },
            select: { id: true },
        });
        return cliente?.id ?? null;
    }
    async create(address) {
        return this.prisma.direccion.create({ data: address });
    }
    async findByClienteId(clienteId) {
        return this.prisma.direccion.findMany({
            where: { clienteId },
            orderBy: [{ esPrincipal: 'desc' }, { createdAt: 'asc' }],
        });
    }
    async findById(id) {
        return this.prisma.direccion.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.direccion.update({ where: { id }, data });
    }
    async setPrimary(id, clienteId) {
        await this.prisma.$transaction([
            this.prisma.direccion.updateMany({
                where: { clienteId },
                data: { esPrincipal: false },
            }),
            this.prisma.direccion.update({
                where: { id },
                data: { esPrincipal: true },
            }),
        ]);
    }
    async delete(id) {
        await this.prisma.direccion.delete({ where: { id } });
    }
};
exports.PrismaAddressRepository = PrismaAddressRepository;
exports.PrismaAddressRepository = PrismaAddressRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAddressRepository);
//# sourceMappingURL=prisma-address.repository.js.map