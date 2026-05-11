import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductionController } from './production.controller';
import { ProductionService } from '../../application/production.service';
import { PrismaProductionOrderRepository } from '../persistence/prisma-production-order.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductionController],
  providers: [
    { provide: 'ProductionOrderRepository', useClass: PrismaProductionOrderRepository },
    ProductionService,
  ],
})
export class ProductionModule {}
