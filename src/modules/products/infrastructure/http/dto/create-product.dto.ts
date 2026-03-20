import { IsArray, IsHexColor, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  @IsOptional()
  cantidad?: number;

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
}
