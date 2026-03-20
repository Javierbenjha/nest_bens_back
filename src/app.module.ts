import { Module } from '@nestjs/common';
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

// Módulos pendientes de migración o sin implementar
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { LogisticsModule } from './modules/logistics/logistics.module';

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
    // Pendientes
    AuthModule,
    CategoriesModule,
    InventoryModule,
    SalesModule,
    LogisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

