import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsBoolean, IsDateString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { TipoCupon } from '@prisma/client';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  codigo: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsEnum(TipoCupon)
  @IsOptional()
  tipo?: TipoCupon;

  @IsInt()
  @IsOptional()
  usosMaximos?: number;

  @IsDateString()
  @IsOptional()
  fechaExpiracion?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
