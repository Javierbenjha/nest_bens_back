import { IsArray, IsHexColor, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  nombre: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  categoriaId: number;

  @IsNumber()
  marcaId: number;

  @IsArray()
  @IsHexColor({ each: true })
  @IsOptional()
  color?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tallas?: string[];

  @IsString()
  @IsOptional()
  estado?: 'ACTIVO' | 'INACTIVO';

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  tipoDescuento?: 'PORCENTAJE' | 'VALOR_FIJO' | 'SIN_DESCUENTO';

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value))
  valorDescuento?: number;

  @IsArray()
  @IsOptional()
  imagenes?: any[];
}
