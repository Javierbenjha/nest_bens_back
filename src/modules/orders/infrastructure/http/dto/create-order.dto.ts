import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class OrderItemDto {
  @IsInt()
  @IsNotEmpty()
  productoId: number;

  @IsInt()
  @IsNotEmpty()
  cantidad: number;
}

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  cuponCodigo?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsNotEmpty()
  detalles: OrderItemDto[];
}
