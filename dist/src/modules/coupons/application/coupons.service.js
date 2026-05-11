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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let CouponsService = class CouponsService {
    prisma;
    couponRepository;
    constructor(prisma, couponRepository) {
        this.prisma = prisma;
        this.couponRepository = couponRepository;
    }
    async create(createCouponDto) {
        return this.prisma.cupon.create({
            data: {
                codigo: createCouponDto.codigo,
                descripcion: createCouponDto.descripcion,
                valor: createCouponDto.valor,
                tipo: createCouponDto.tipo,
                usosMaximos: createCouponDto.usosMaximos,
                fechaExpiracion: createCouponDto.fechaExpiracion ? new Date(createCouponDto.fechaExpiracion) : null,
                activo: createCouponDto.activo ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.cupon.findMany();
    }
    async findOne(codigo) {
        const coupon = await this.couponRepository.findByCode(codigo);
        if (!coupon) {
            throw new common_1.NotFoundException(`Cupón con código ${codigo} no encontrado`);
        }
        return coupon;
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('CouponRepository')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map