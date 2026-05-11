import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoComprobanteDto } from './create-tipo-comprobante.dto';

export class UpdateTipoComprobanteDto extends PartialType(CreateTipoComprobanteDto) {}
