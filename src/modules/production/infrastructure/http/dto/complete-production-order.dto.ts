import { IsInt, IsPositive } from 'class-validator';

export class CompleteProductionOrderDto {
  @IsInt()
  @IsPositive()
  cantidadProducida: number;
}
