import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

class OrderItemDto {
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @IsNotEmpty()
  productoId!: number;

  @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : value))
  @IsInt()
  @IsOptional()
  tallaId?: number;

  @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : value))
  @IsInt()
  @IsOptional()
  colorId?: number;

  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @IsNotEmpty()
  cantidad!: number;

  @Transform(({ value }) => parseFloat(String(value)))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  precioUnitario?: number;

  @IsBoolean()
  @IsOptional()
  omitirDescuento?: boolean;
}

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  clienteId!: number;

  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @IsInt()
  @IsOptional()
  medioPagoId?: number;

  @IsInt()
  @IsOptional()
  tipoComprobanteId?: number;

  @IsString()
  @IsOptional()
  direccionEnvio?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsEnum(['ERP', 'ECOMMERCE'])
  @IsOptional()
  origen?: 'ERP' | 'ECOMMERCE';

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  cuponCodigo?: string;

  @IsString()
  @IsOptional()
  fechaEntrega?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsNotEmpty()
  detalles!: OrderItemDto[];
}
