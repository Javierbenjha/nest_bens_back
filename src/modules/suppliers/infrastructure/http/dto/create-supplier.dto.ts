import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSupplierDto {
  @IsNumber()
  @IsNotEmpty()
  documento: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
