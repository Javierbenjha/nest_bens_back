import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressesController } from './addresses.controller';
import { AddressesService } from '../../application/addresses.service';
import { PrismaAddressRepository } from '../persistence/prisma-address.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AddressesController],
  providers: [
    { provide: 'AddressRepository', useClass: PrismaAddressRepository },
    AddressesService,
  ],
})
export class AddressesModule {}
