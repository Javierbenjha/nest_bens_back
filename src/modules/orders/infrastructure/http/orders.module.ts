import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../../application/orders.service';
import { PrismaOrderRepository } from '../persistence/prisma-order.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CouponsModule } from '../../../coupons/infrastructure/http/coupons.module';

@Module({
  imports: [PrismaModule, CouponsModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaOrderRepository,
  ],
})
export class OrdersModule {}
