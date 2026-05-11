import { Transform } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateInventoryDto {
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  productoId!: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  colorId!: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  tallaId!: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(0)
  stock!: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(0)
  stockMinimo!: number;

  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @Min(0)
  precio!: number;
}
