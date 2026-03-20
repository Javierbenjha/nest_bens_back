import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from '../../application/purchases.service';
import { PrismaPurchaseRepository } from '../persistence/prisma-purchase.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchasesController],
  providers: [
    {
      provide: 'PurchaseRepository',
      useClass: PrismaPurchaseRepository,
    },
    PurchasesService,
  ],
})
export class PurchasesModule {}
