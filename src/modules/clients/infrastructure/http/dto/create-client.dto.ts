import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto {
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
