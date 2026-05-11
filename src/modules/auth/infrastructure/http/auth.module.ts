import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

import { AuthService } from '../../application/auth.service';
import { AuthController } from './auth.controller';
import { PrismaAuthRepository } from '../persistence/prisma-auth.repository';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Adapter: vincula el port AuthRepository con su implementación Prisma
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepository,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
