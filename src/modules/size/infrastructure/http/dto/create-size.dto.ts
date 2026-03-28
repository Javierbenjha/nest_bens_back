import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSizeDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  nombre: string;
}
