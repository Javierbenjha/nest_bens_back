import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { UserRepository } from '../../users/domain/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Validar credenciales (llamado por LocalStrategy)
  async validateUser(correo: string, pass: string): Promise<any> {
    const user = await this.userRepo.findByEmail(correo);
    if (user && await bcrypt.compare(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 2. Generar JWT una vez validado (llamado por AuthController)
  async login(user: any) {
    const payload = { correo: user.correo, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
