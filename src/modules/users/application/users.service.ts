import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import type { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly repo: UserRepository,
  ) {}

  async create(data: { correo: string; password: string; rol?: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.repo.create({
      correo: data.correo,
      rol: data.rol,
      password: hashedPassword,
    });
  }

  findAll(): Promise<User[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<User | null> {
    return this.repo.findById(id);
  }

  update(id: number, user: Partial<User>): Promise<User> {
    return this.repo.update(id, user);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
