import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../../application/users.service';
import { PrismaUserRepository } from '../persistence/prisma-user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    UsersService,
  ],
  exports: [UsersService, 'UserRepository'],
})
export class UsersModule {}
