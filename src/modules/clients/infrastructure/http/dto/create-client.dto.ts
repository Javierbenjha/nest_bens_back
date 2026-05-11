import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateClientDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  tipoDocumentoId?: number;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
