import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../application/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // Le indicamos a Passport que nuestro campo de usuario se llama 'correo'
        super({ usernameField: 'correo' });
    }

    async validate(correo: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(correo, pass);
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }
        return user;
    }
}
