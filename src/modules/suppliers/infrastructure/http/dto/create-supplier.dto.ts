import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  descripcion?: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
