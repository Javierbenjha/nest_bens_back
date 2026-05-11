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
exports.PrismaAuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaAuthRepository = class PrismaAuthRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(correo) {
        const user = await this.prisma.usuario.findUnique({
            where: { correo },
            include: {
                cliente: {
                    select: {
                        id: true,
                        nombre: true,
                        apellido: true,
                        correo: true,
                        telefono: true,
                    },
                },
            },
        });
        if (!user)
            return null;
        return {
            id: user.id,
            correo: user.correo,
            rol: user.rol,
            password: user.password,
            cliente: user.cliente ?? null,
        };
    }
    async createUserWithClient(data) {
        const result = await this.prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.create({
                data: {
                    correo: data.correo,
                    password: data.password,
                    rol: 'CLIENTE',
                },
            });
            const cliente = await tx.cliente.create({
                data: {
                    usuarioId: usuario.id,
                    correo: data.correo,
                    nombre: data.nombre,
                    apellido: data.apellido,
                    telefono: data.telefono ?? null,
                },
            });
            return { usuario, cliente };
        });
        return {
            id: result.usuario.id,
            correo: result.usuario.correo,
            rol: result.usuario.rol,
            cliente: {
                id: result.cliente.id,
                nombre: result.cliente.nombre,
                apellido: result.cliente.apellido,
                correo: result.cliente.correo,
                telefono: result.cliente.telefono ?? null,
            },
        };
    }
};
exports.PrismaAuthRepository = PrismaAuthRepository;
exports.PrismaAuthRepository = PrismaAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAuthRepository);
//# sourceMappingURL=prisma-auth.repository.js.map