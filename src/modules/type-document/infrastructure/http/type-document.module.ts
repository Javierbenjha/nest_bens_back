import { Module } from '@nestjs/common';
import { TypeDocumentService } from '../../application/type-document.service';
import { TypeDocumentController } from './type-document.controller';
import { PrismaTypeDocumentRepository } from '../persistence/prisma-type-document.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TypeDocumentController],
  providers: [
    TypeDocumentService,
    {
      provide: 'TypeDocumentRepository',
      useClass: PrismaTypeDocumentRepository,
    },
  ],
})
export class TypeDocumentModule {}
