"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("../../application/orders.service");
const prisma_order_repository_1 = require("../persistence/prisma-order.repository");
const prisma_module_1 = require("../../../../prisma/prisma.module");
const coupons_module_1 = require("../../../coupons/infrastructure/http/coupons.module");
const products_module_1 = require("../../../products/infrastructure/http/products.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, coupons_module_1.CouponsModule, products_module_1.ProductsModule],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            {
                provide: 'OrderRepository',
                useClass: prisma_order_repository_1.PrismaOrderRepository,
            },
            orders_service_1.OrdersService,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map