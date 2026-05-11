import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { AuthRepository } from '../domain/auth.repository';
import type { AuthToken, AuthUser } from '../domain/auth.entity';
import type { RegisterDto } from '../infrastructure/http/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales del usuario (llamado por LocalStrategy).
   * Retorna los datos del usuario sin password, o null si las credenciales son inválidas.
   */
  async validateUser(correo: string, pass: string): Promise<AuthUser | null> {
    const user = await this.authRepo.findByEmail(correo);
    if (!user) return null;

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) return null;

    // No exponemos el password
    const { password: _, ...result } = user;
    return result as AuthUser;
  }

  /**
   * Genera el JWT para un usuario ya validado (llamado desde el controller tras LocalStrategy).
   */
  async login(user: AuthUser): Promise<AuthToken> {
    const payload = { correo: user.correo, sub: user.id, rol: user.rol, clienteId: user.cliente?.id ?? null };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  /**
   * Registra un nuevo usuario con rol CLIENTE y su perfil de cliente en una transacción.
   * Retorna un JWT listo para usar (no requiere segundo login).
   */
  async register(dto: RegisterDto): Promise<AuthToken> {
    // 1. Verificar que el correo no esté en uso
    const existing = await this.authRepo.findByEmail(dto.correo);
    if (existing) throw new ConflictException('El correo ya está registrado');

    // 2. Hashear contraseña (responsabilidad de la capa de aplicación)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Delegar la creación al repositorio (transacción atómica)
    const newUser = await this.authRepo.createUserWithClient({
      correo: dto.correo,
      password: hashedPassword,
      nombre: dto.nombre,
      apellido: dto.apellido,
      telefono: dto.telefono ?? null,
    });

    // 4. Generar y retornar el token
    const payload = { correo: newUser.correo, sub: newUser.id, rol: newUser.rol, clienteId: newUser.cliente?.id ?? null };
    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
    };
  }
}
