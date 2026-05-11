import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SalesService } from '../../application/sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Sales')
@ApiBearerAuth()
@ErpAccess()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createFromOrder(createSaleDto.pedidoId);
  }

  @Post('from-order/:pedidoId')
  createFromOrder(@Param('pedidoId') pedidoId: string) {
    return this.salesService.createFromOrder(+pedidoId);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
