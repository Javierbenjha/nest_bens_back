import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PurchasesService } from '../../application/purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Purchases')
@ApiBearerAuth()
@ErpAccess()
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(+id);
  }

  @Patch(':id/anular')
  anular(@Param('id') id: string) {
    return this.purchasesService.anular(+id);
  }
}
