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
exports.PrismaClientRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaClientRepository = class PrismaClientRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(client) {
        return this.prisma.cliente.create({
            data: client,
        });
    }
    async findAll() {
        return this.prisma.cliente.findMany();
    }
    async findById(id) {
        return this.prisma.cliente.findUnique({ where: { id } });
    }
    async findByDocumento(documento) {
        return this.prisma.cliente.findUnique({ where: { documento } });
    }
    async findByEmail(correo) {
        return this.prisma.cliente.findUnique({ where: { correo } });
    }
    async update(id, client) {
        return this.prisma.cliente.update({
            where: { id },
            data: client,
        });
    }
    async delete(id) {
        await this.prisma.cliente.delete({ where: { id } });
    }
};
exports.PrismaClientRepository = PrismaClientRepository;
exports.PrismaClientRepository = PrismaClientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaClientRepository);
//# sourceMappingURL=prisma-client.repository.js.map