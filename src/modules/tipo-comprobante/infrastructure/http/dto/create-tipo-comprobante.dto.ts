import { IsString, MinLength } from 'class-validator';

export class CreateTipoComprobanteDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(1)
  abreviatura: string;
}
