import { IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  nombre: string;
}
