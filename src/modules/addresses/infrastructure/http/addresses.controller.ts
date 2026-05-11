import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { AddressesService } from '../../application/addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { EcommerceAccess } from '../../../../common/decorators/roles.decorator';

@ApiTags('Addresses')
@ApiBearerAuth()
@EcommerceAccess()
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateAddressDto) {
    return this.addressesService.create(req.user.userId, {
      ...dto,
      esPrincipal: dto.esPrincipal ?? false,
    });
  }

  @Get()
  findMine(@Request() req) {
    return this.addressesService.findMine(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Request() req, @Body() dto: UpdateAddressDto) {
    return this.addressesService.update(id, req.user.userId, dto);
  }

  @Patch(':id/primary')
  setPrimary(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.addressesService.setPrimary(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.addressesService.remove(id, req.user.userId);
  }
}
