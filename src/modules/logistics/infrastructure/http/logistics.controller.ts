import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { LogisticsService } from '../../application/logistics.service';
import { DeliverOrderDto } from './dto/deliver-order.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Logistics')
@ApiBearerAuth()
@ErpAccess()
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get('pending')
  findPending() {
    return this.logisticsService.findPending();
  }

  @Get()
  findAll() {
    return this.logisticsService.findAll();
  }

  @Get(':pedidoId')
  findOne(@Param('pedidoId') id: string) {
    return this.logisticsService.findOne(+id);
  }

  @Patch('dispatch/:pedidoId')
  dispatch(@Param('pedidoId') id: string) {
    return this.logisticsService.dispatch(+id);
  }

  @Patch('deliver/:pedidoId')
  deliver(@Param('pedidoId') id: string, @Body() dto: DeliverOrderDto) {
    return this.logisticsService.deliver(+id, dto);
  }
}
