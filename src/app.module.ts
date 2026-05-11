import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PrismaModule } from './prisma/prisma.module';

// Módulos migrados a Arquitectura Hexagonal
import { PurchasesModule } from './modules/purchases/infrastructure/http/purchases.module';
import { ItemsModule } from './modules/items/infrastructure/http/items.module';
import { BrandModule } from './modules/brand/infrastructure/http/brand.module';
import { SizeModule } from './modules/size/infrastructure/http/size.module';
import { SuppliersModule } from './modules/suppliers/infrastructure/http/suppliers.module';
import { ClientsModule } from './modules/clients/infrastructure/http/clients.module';
import { ProductsModule } from './modules/products/infrastructure/http/products.module';
import { UsersModule } from './modules/users/infrastructure/http/users.module';
import { OrdersModule } from './modules/orders/infrastructure/http/orders.module';
import { TypeDocumentModule } from './modules/type-document/infrastructure/http/type-document.module';
import { PaymentMethodModule } from './modules/payment-method/infrastructure/http/payment-method.module';
import { TipoComprobanteModule } from './modules/tipo-comprobante/infrastructure/http/tipo-comprobante.module';

import { CategoriesModule } from './modules/categories/infrastructure/http/categories.module';
import { LogisticsModule } from './modules/logistics/infrastructure/http/logistics.module';
import { SalesModule } from './modules/sales/infrastructure/http/sales.module';
import { CouponsModule } from './modules/coupons/infrastructure/http/coupons.module';
import { RecipesModule } from './modules/recipes/infrastructure/http/recipes.module';
import { ProductionModule } from './modules/production/infrastructure/http/production.module';
import { AddressesModule } from './modules/addresses/infrastructure/http/addresses.module';

// Módulos migrados a Arquitectura Hexagonal (completos)
import { AuthModule } from './modules/auth/infrastructure/http/auth.module';
import { InventoryModule } from './modules/inventory/infrastructure/http/inventory.module';

@Module({
  imports: [
    PrismaModule,
    // Hexagonales
    PurchasesModule,
    ItemsModule,
    BrandModule,
    SizeModule,
    SuppliersModule,
    ClientsModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    TypeDocumentModule,
    PaymentMethodModule,
    TipoComprobanteModule,
    // Hexagonales (migrados)
    CategoriesModule,
    LogisticsModule,
    SalesModule,
    CouponsModule,
    RecipesModule,
    ProductionModule,
    AddressesModule,
    // Pendientes
    AuthModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
