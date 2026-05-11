import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CouponsService } from '../../application/coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';
import { Public } from '../../../../common/decorators/public.decorator';

@ApiTags('Coupons')
@ApiBearerAuth()
@ErpAccess()
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  // Público: el cliente puede validar su cupón antes de confirmar el pedido
  @Public()
  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.couponsService.findOne(codigo);
  }
}
