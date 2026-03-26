import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CouponsService } from '../../application/coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  async findAll() {
    return this.couponsService.findAll();
  }

  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string) {
    return this.couponsService.findOne(codigo);
  }
}
