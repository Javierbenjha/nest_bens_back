import { IsString, MinLength } from 'class-validator';

export class CreateTypeDocumentDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(1)
  abreviatura: string;
}
