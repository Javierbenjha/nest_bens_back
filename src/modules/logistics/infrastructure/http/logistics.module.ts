import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from '../../application/logistics.service';
import { PrismaLogisticRepository } from '../persistence/prisma-logistic.repository';

@Module({
  imports: [PrismaModule],
  controllers: [LogisticsController],
  providers: [
    {
      provide: 'LogisticRepository',
      useClass: PrismaLogisticRepository,
    },
    LogisticsService,
  ],
})
export class LogisticsModule {}
