import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from '../../application/recipes.service';
import { PrismaRecipeRepository } from '../persistence/prisma-recipe.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RecipesController],
  providers: [
    { provide: 'RecipeRepository', useClass: PrismaRecipeRepository },
    RecipesService,
  ],
})
export class RecipesModule {}
