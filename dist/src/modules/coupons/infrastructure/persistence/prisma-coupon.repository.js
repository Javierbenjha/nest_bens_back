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
exports.PrismaCouponRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const coupon_entity_1 = require("../../domain/coupon.entity");
let PrismaCouponRepository = class PrismaCouponRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByCode(codigo) {
        const rawCoupon = await this.prisma.cupon.findUnique({
            where: { codigo },
        });
        if (!rawCoupon)
            return null;
        return new coupon_entity_1.Coupon(rawCoupon.id, rawCoupon.codigo, Number(rawCoupon.valor), rawCoupon.tipo, rawCoupon.usosMaximos, rawCoupon.usosActuales, rawCoupon.activo, rawCoupon.fechaExpiracion);
    }
    async incrementUsage(id) {
        await this.prisma.cupon.update({
            where: { id },
            data: { usosActuales: { increment: 1 } },
        });
    }
    async findById(id) {
        return this.prisma.cupon.findUnique({
            where: { id },
        });
    }
};
exports.PrismaCouponRepository = PrismaCouponRepository;
exports.PrismaCouponRepository = PrismaCouponRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCouponRepository);
//# sourceMappingURL=prisma-coupon.repository.js.map