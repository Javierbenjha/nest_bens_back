import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: User & {
        password: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(correo: string): Promise<(User & {
        password: string;
    }) | null>;
    update(id: number, user: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}
