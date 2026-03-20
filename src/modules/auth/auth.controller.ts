import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint público para iniciar sesión
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Endpoint privado — requiere JWT válido
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  getProfile(@Request() req) {
    return req.user;
  }
}
