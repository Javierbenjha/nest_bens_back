import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductionOrderDto {
  @IsInt()
  @IsPositive()
  productoId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  tallaId?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  colorId?: number;

  @IsInt()
  @IsPositive()
  cantidadPlanificada: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
