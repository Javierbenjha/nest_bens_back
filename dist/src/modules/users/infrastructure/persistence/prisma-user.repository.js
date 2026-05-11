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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const user = await this.prisma.usuario.create({
            data: {
                correo: data.correo,
                password: data.password,
                ...(data.rol && { rol: data.rol }),
            },
            select: { id: true, correo: true, rol: true, createdAt: true },
        });
        return user;
    }
    async findAll() {
        return this.prisma.usuario.findMany({
            select: { id: true, correo: true, rol: true, createdAt: true },
        });
    }
    async findById(id) {
        return this.prisma.usuario.findUnique({
            where: { id },
            select: { id: true, correo: true, rol: true, createdAt: true },
        });
    }
    async findByEmail(correo) {
        return this.prisma.usuario.findUnique({ where: { correo } });
    }
    async update(id, user) {
        return this.prisma.usuario.update({
            where: { id },
            data: user,
            select: { id: true, correo: true, rol: true, createdAt: true },
        });
    }
    async delete(id) {
        await this.prisma.usuario.delete({ where: { id } });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map