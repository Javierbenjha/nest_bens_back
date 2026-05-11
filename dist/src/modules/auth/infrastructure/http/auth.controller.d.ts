import { AuthService } from '../../application/auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<import("../../domain/auth.entity").AuthToken>;
    register(dto: RegisterDto): Promise<import("../../domain/auth.entity").AuthToken>;
    getProfile(req: any): any;
}
