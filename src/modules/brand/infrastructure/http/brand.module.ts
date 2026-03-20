import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from '../../application/brand.service';
import { PrismaBrandRepository } from '../persistence/prisma-brand.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [
    {
      provide: 'BrandRepository',
      useClass: PrismaBrandRepository,
    },
    BrandService,
  ],
})
export class BrandModule {}
