import { User } from './user.entity';

export interface UserRepository {
  create(user: User & { password: string }): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(correo: string): Promise<(User & { password: string }) | null>;
  update(id: number, user: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}
