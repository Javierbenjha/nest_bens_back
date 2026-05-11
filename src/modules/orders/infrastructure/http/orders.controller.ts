import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { OrdersService } from '../../application/orders.service';
import { ErpAccess, EcommerceAccess, Roles } from '../../../../common/decorators/roles.decorator';

@ApiTags('Orders')
@ApiBearerAuth()
@ErpAccess()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ERP y Ecommerce pueden crear pedidos
  @Roles('ADMINISTRADOR', 'VENDEDOR', 'CLIENTE')
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // El cliente ve solo sus propios pedidos
  @EcommerceAccess()
  @Get('my')
  getMyOrders(@Request() req) {
    return this.ordersService.findMyOrders(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/pay')
  confirmPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConfirmPaymentDto,
  ) {
    return this.ordersService.confirmPayment(id, dto.medioPagoId, dto.tipoComprobanteId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.cancel(id);
  }
}
