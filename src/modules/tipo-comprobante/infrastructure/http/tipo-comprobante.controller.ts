import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoComprobanteService } from '../../application/tipo-comprobante.service';
import { CreateTipoComprobanteDto } from './dto/create-tipo-comprobante.dto';
import { UpdateTipoComprobanteDto } from './dto/update-tipo-comprobante.dto';
import { Public } from '../../../../common/decorators/public.decorator';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Tipo-comprobante')
@ApiBearerAuth()
@Controller('tipo-comprobante')
export class TipoComprobanteController {
  constructor(private readonly service: TipoComprobanteService) {}

  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ErpAccess()
  @Post()
  create(@Body() dto: CreateTipoComprobanteDto) {
    return this.service.create(dto);
  }

  @ErpAccess()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTipoComprobanteDto) {
    return this.service.update(+id, dto);
  }

  @ErpAccess()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
