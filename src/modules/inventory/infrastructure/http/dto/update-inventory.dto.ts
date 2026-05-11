import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateInventoryDto {
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(0)
  stock!: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(0)
  stockMinimo?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @Min(0)
  precio?: number;
}
