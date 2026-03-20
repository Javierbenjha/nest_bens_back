import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User & { password: string }): Promise<User> {
    const user = await this.prisma.usuario.create({
      data: {
        correo: data.correo,
        password: data.password,
        ...(data.rol && { rol: data.rol as any }),
      },
      select: { id: true, correo: true, rol: true, createdAt: true },
    });
    return user as unknown as User;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.usuario.findMany({
      select: { id: true, correo: true, rol: true, createdAt: true },
    }) as unknown as User[];
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, correo: true, rol: true, createdAt: true },
    }) as unknown as User | null;
  }

  async findByEmail(correo: string): Promise<(User & { password: string }) | null> {
    return this.prisma.usuario.findUnique({ where: { correo } }) as unknown as (User & { password: string }) | null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return this.prisma.usuario.update({
      where: { id },
      data: user as any,
      select: { id: true, correo: true, rol: true, createdAt: true },
    }) as unknown as User;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}
