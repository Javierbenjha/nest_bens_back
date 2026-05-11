import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateRecipeDto {
  @IsInt()
  @IsPositive()
  productoId: number;

  @IsInt()
  @IsPositive()
  articuloId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}
