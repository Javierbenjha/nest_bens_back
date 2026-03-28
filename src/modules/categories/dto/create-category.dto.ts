import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
    nombre: string;
}
