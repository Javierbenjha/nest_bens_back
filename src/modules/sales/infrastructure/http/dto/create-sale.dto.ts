import { IsInt, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  pedidoId: number;
}
