import { PrismaService } from 'src/prisma/prisma.service';
import type { AuthRepository, RegisterData } from '../../domain/auth.repository';
import type { AuthUser } from '../../domain/auth.entity';
export declare class PrismaAuthRepository implements AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(correo: string): Promise<(AuthUser & {
        password: string;
    }) | null>;
    createUserWithClient(data: RegisterData): Promise<AuthUser>;
}
