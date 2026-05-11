import type { UserRepository } from '../domain/user.repository';
import type { User } from '../domain/user.entity';
export declare class UsersService {
    private readonly repo;
    constructor(repo: UserRepository);
    create(data: {
        correo: string;
        password: string;
        rol?: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
