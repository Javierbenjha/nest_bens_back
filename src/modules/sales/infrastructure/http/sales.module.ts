import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SalesController } from './sales.controller';
import { SalesService } from '../../application/sales.service';
import { PrismaSaleRepository } from '../persistence/prisma-sale.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SalesController],
  providers: [
    {
      provide: 'SaleRepository',
      useClass: PrismaSaleRepository,
    },
    SalesService,
  ],
})
export class SalesModule {}
