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
exports.PrismaPaymentMethodRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let PrismaPaymentMethodRepository = class PrismaPaymentMethodRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(paymentMethod) {
        const { id, createdAt, updatedAt, ...data } = paymentMethod;
        return this.prisma.medioPago.create({ data });
    }
    async findAll() {
        return this.prisma.medioPago.findMany();
    }
    async findById(id) {
        return this.prisma.medioPago.findUnique({ where: { id } });
    }
    async update(id, paymentMethod) {
        const { id: _id, createdAt, updatedAt, ...data } = paymentMethod;
        return this.prisma.medioPago.update({ where: { id }, data });
    }
    async delete(id) {
        await this.prisma.medioPago.delete({ where: { id } });
    }
};
exports.PrismaPaymentMethodRepository = PrismaPaymentMethodRepository;
exports.PrismaPaymentMethodRepository = PrismaPaymentMethodRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPaymentMethodRepository);
//# sourceMappingURL=prisma-payment-method.repository.js.map