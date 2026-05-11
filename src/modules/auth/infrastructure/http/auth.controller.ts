import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../application/auth.service';
import { Public } from '../../../../common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica con correo y contraseña. Retorna JWT.' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna access_token' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Registrarse como cliente', description: 'Crea un nuevo usuario con rol CLIENTE y su perfil. Retorna JWT.' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Registro exitoso, retorna access_token' })
  @ApiResponse({ status: 409, description: 'El correo ya está registrado' })
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Ver perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Datos del usuario del token JWT actual' })
  @ApiResponse({ status: 401, description: 'Token inválido o expirado' })
  @Get('perfil')
  getProfile(@Request() req) {
    return req.user;
  }
}
