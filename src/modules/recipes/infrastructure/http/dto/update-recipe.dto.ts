import { IsNumber, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
  @IsNumber()
  @IsPositive()
  cantidad: number;
}
