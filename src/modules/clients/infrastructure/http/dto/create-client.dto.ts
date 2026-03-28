import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateClientDto {
  @IsNumber()
  @IsNotEmpty()
  documento: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  apellido: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
