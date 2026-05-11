"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const prisma_module_1 = require("./prisma/prisma.module");
const purchases_module_1 = require("./modules/purchases/infrastructure/http/purchases.module");
const items_module_1 = require("./modules/items/infrastructure/http/items.module");
const brand_module_1 = require("./modules/brand/infrastructure/http/brand.module");
const size_module_1 = require("./modules/size/infrastructure/http/size.module");
const suppliers_module_1 = require("./modules/suppliers/infrastructure/http/suppliers.module");
const clients_module_1 = require("./modules/clients/infrastructure/http/clients.module");
const products_module_1 = require("./modules/products/infrastructure/http/products.module");
const users_module_1 = require("./modules/users/infrastructure/http/users.module");
const orders_module_1 = require("./modules/orders/infrastructure/http/orders.module");
const type_document_module_1 = require("./modules/type-document/infrastructure/http/type-document.module");
const payment_method_module_1 = require("./modules/payment-method/infrastructure/http/payment-method.module");
const tipo_comprobante_module_1 = require("./modules/tipo-comprobante/infrastructure/http/tipo-comprobante.module");
const categories_module_1 = require("./modules/categories/infrastructure/http/categories.module");
const logistics_module_1 = require("./modules/logistics/infrastructure/http/logistics.module");
const sales_module_1 = require("./modules/sales/infrastructure/http/sales.module");
const coupons_module_1 = require("./modules/coupons/infrastructure/http/coupons.module");
const recipes_module_1 = require("./modules/recipes/infrastructure/http/recipes.module");
const production_module_1 = require("./modules/production/infrastructure/http/production.module");
const addresses_module_1 = require("./modules/addresses/infrastructure/http/addresses.module");
const auth_module_1 = require("./modules/auth/infrastructure/http/auth.module");
const inventory_module_1 = require("./modules/inventory/infrastructure/http/inventory.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            purchases_module_1.PurchasesModule,
            items_module_1.ItemsModule,
            brand_module_1.BrandModule,
            size_module_1.SizeModule,
            suppliers_module_1.SuppliersModule,
            clients_module_1.ClientsModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            type_document_module_1.TypeDocumentModule,
            payment_method_module_1.PaymentMethodModule,
            tipo_comprobante_module_1.TipoComprobanteModule,
            categories_module_1.CategoriesModule,
            logistics_module_1.LogisticsModule,
            sales_module_1.SalesModule,
            coupons_module_1.CouponsModule,
            recipes_module_1.RecipesModule,
            production_module_1.ProductionModule,
            addresses_module_1.AddressesModule,
            auth_module_1.AuthModule,
            inventory_module_1.InventoryModule,
        ],
        controllers: [],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map