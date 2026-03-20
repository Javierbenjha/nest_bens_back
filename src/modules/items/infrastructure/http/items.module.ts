import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from '../../application/items.service';
import { PrismaItemRepository } from '../persistence/prisma-item.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepository,
    },
    ItemsService,
  ],
})
export class ItemsModule {}
