import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseDetailDto {
  @IsInt()
  @IsOptional()
  productoId?: number;

  @IsInt()
  @IsOptional()
  articuloId?: number;

  @IsInt()
  @IsOptional()
  tallaId?: number;

  @IsInt()
  @IsOptional()
  colorId?: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @IsPositive()
  cantidad!: number;

  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @IsPositive()
  precio!: number;
}

export class CreatePurchaseDto {
  @IsEnum(['PRODUCTO', 'ARTICULO'])
  tipo!: 'PRODUCTO' | 'ARTICULO';

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  proveedorId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseDetailDto)
  detalles!: CreatePurchaseDetailDto[];
}
