import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DeliverOrderDto {
  @IsString()
  @IsOptional()
  direccionEnvio?: string;

  @IsDateString()
  @IsOptional()
  fechaEntrega?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
