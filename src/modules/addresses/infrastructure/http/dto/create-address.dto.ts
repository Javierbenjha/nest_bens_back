import { IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  alias: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  distrito: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsOptional()
  referencia?: string;

  @IsBoolean()
  @IsOptional()
  esPrincipal?: boolean;
}
