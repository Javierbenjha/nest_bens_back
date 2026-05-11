import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InventoryService } from '../../application/inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';
import { Public } from '../../../../common/decorators/public.decorator';

@ApiTags('Inventory')
@ApiBearerAuth()
@ErpAccess()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('low-stock')
  findLowStock() {
    return this.inventoryService.findLowStock();
  }

  // Público: el ecommerce necesita consultar stock disponible por producto
  @Public()
  @Get('product/:productoId')
  findByProduct(@Param('productoId') id: string) {
    return this.inventoryService.findByProduct(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Get(':id/movements')
  getMovements(@Param('id') id: string) {
    return this.inventoryService.getMovements(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.update(+id, dto.stock, dto.stockMinimo, dto.precio);
  }
}
