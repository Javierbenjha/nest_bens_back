import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../application/products.service';
import { PrismaProductRepository } from '../persistence/prisma-product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
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
