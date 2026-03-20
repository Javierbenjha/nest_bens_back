import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from '../../application/size.service';
import { PrismaSizeRepository } from '../persistence/prisma-size.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SizeController],
  providers: [
    {
      provide: 'SizeRepository',
      useClass: PrismaSizeRepository,
    },
    SizeService,
  ],
})
export class SizeModule {}
