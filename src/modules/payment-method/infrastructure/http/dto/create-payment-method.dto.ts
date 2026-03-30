import { IsString, MinLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  @MinLength(2)
  nombre: string;
}
