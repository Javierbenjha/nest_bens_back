import { JwtService } from '@nestjs/jwt';
import type { AuthRepository } from '../domain/auth.repository';
import type { AuthToken, AuthUser } from '../domain/auth.entity';
import type { RegisterDto } from '../infrastructure/http/dto/register.dto';
export declare class AuthService {
    private readonly authRepo;
    private readonly jwtService;
    constructor(authRepo: AuthRepository, jwtService: JwtService);
    validateUser(correo: string, pass: string): Promise<AuthUser | null>;
    login(user: AuthUser): Promise<AuthToken>;
    register(dto: RegisterDto): Promise<AuthToken>;
}
