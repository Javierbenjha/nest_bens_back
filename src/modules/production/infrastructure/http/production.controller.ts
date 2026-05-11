import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ProductionService } from '../../application/production.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { CompleteProductionOrderDto } from './dto/complete-production-order.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Production')
@ApiBearerAuth()
@ErpAccess()
@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  create(@Body() dto: CreateProductionOrderDto, @Request() req) {
    return this.productionService.create({
      ...dto,
      cantidadProducida: 0,
      estado: 'PENDIENTE',
      usuarioId: req.user.userId,
    });
  }

  @Get()
  findAll() {
    return this.productionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productionService.findOne(id);
  }

  @Patch(':id/start')
  start(@Param('id', ParseIntPipe) id: number) {
    return this.productionService.start(id);
  }

  @Patch(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number, @Body() dto: CompleteProductionOrderDto) {
    return this.productionService.complete(id, dto.cantidadProducida);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.productionService.cancel(id);
  }
}
