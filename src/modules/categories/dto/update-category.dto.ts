import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
    nombre: string;
}
