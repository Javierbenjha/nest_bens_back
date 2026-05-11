"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsModule = void 0;
const common_1 = require("@nestjs/common");
const coupons_controller_1 = require("./coupons.controller");
const prisma_coupon_repository_1 = require("../persistence/prisma-coupon.repository");
const coupons_service_1 = require("../../application/coupons.service");
const prisma_module_1 = require("../../../../prisma/prisma.module");
let CouponsModule = class CouponsModule {
};
exports.CouponsModule = CouponsModule;
exports.CouponsModule = CouponsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [coupons_controller_1.CouponsController],
        providers: [
            { provide: 'CouponRepository', useClass: prisma_coupon_repository_1.PrismaCouponRepository },
            coupons_service_1.CouponsService,
        ],
        exports: ['CouponRepository', coupons_service_1.CouponsService],
    })
], CouponsModule);
//# sourceMappingURL=coupons.module.js.map