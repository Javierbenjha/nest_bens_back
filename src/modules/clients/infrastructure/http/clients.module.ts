import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../../application/clients.service';
import { PrismaClientRepository } from '../persistence/prisma-client.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [
    {
      provide: 'ClientRepository',
      useClass: PrismaClientRepository,
    },
    ClientsService,
  ],
})
export class ClientsModule {}
