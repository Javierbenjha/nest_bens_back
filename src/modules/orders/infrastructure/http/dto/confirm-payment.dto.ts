import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ConfirmPaymentDto {
  @IsInt()
  @IsNotEmpty()
  medioPagoId!: number;

  @IsInt()
  @IsOptional()
  tipoComprobanteId?: number;
}
