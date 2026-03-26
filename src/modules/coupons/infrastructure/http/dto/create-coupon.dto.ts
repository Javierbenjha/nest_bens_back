import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsBoolean, IsDateString, IsInt } from 'class-validator';
import { TipoCupon } from '@prisma/client';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsOptional()
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
