import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  precio: number;

  @IsString()
  @IsNotEmpty()
  unidad: string;
}
