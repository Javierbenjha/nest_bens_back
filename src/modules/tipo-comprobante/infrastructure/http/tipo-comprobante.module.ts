import { Module } from '@nestjs/common';
import { TipoComprobanteService } from '../../application/tipo-comprobante.service';
import { TipoComprobanteController } from './tipo-comprobante.controller';
import { PrismaTipoComprobanteRepository } from '../persistence/prisma-tipo-comprobante.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TipoComprobanteController],
  providers: [
    TipoComprobanteService,
    {
      provide: 'TipoComprobanteRepository',
      useClass: PrismaTipoComprobanteRepository,
    },
  ],
})
export class TipoComprobanteModule {}
