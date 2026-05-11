import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '../../application/categories.service';
import { PrismaCategoryRepository } from '../persistence/prisma-category.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    CategoriesService,
  ],
})
export class CategoriesModule {}
