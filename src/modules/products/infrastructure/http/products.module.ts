import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../application/products.service';
import { PrismaProductRepository } from '../persistence/prisma-product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    ProductsService,
  ],
})
export class ProductsModule {}
