import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from '../../application/suppliers.service';
import { PrismaSupplierRepository } from '../persistence/prisma-supplier.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SuppliersController],
  providers: [
    {
      provide: 'SupplierRepository',
      useClass: PrismaSupplierRepository,
    },
    SuppliersService,
  ],
})
export class SuppliersModule {}
