import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InventoryService } from '../../application/inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaInventoryRepository } from '../persistence/prisma-inventory.repository';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController],
  providers: [
    { provide: 'InventoryRepository', useClass: PrismaInventoryRepository },
    InventoryService,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
