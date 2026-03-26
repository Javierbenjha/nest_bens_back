import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { PrismaCouponRepository } from '../persistence/prisma-coupon.repository';
import { CouponsService } from '../../application/coupons.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponsController],
  providers: [PrismaCouponRepository, CouponsService],
  exports: [PrismaCouponRepository, CouponsService],
})
export class CouponsModule {}
