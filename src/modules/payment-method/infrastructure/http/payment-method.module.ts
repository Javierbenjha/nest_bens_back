import { Module } from '@nestjs/common';
import { PaymentMethodService } from '../../application/payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaPaymentMethodRepository } from '../persistence/prisma-payment-method.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentMethodController],
  providers: [
    PaymentMethodService,
    {
      provide: 'PaymentMethodRepository',
      useClass: PrismaPaymentMethodRepository,
    },
  ],
})
export class PaymentMethodModule {}
