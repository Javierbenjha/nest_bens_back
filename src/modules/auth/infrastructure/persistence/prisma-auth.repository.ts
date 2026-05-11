import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { AuthRepository, RegisterData } from '../../domain/auth.repository';
import type { AuthUser } from '../../domain/auth.entity';

/**
 * Adapter (implementación de infraestructura) del port AuthRepository.
 * Usa Prisma para interactuar con la base de datos.
 */
@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(correo: string): Promise<(AuthUser & { password: string }) | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { correo },
      include: {
        cliente: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
            telefono: true,
          },
        },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      correo: user.correo,
      rol: user.rol,
      password: user.password,
      cliente: user.cliente ?? null,
    };
  }

  async createUserWithClient(data: RegisterData): Promise<AuthUser> {
    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Crear el usuario con rol CLIENTE (por defecto para registro público)
      const usuario = await tx.usuario.create({
        data: {
          correo: data.correo,
          password: data.password,
          rol: 'CLIENTE',
        },
      });

      // 2. Crear el perfil de cliente vinculado al usuario
      const cliente = await tx.cliente.create({
        data: {
          usuarioId: usuario.id,
          correo: data.correo,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono ?? null,
        },
      });

      return { usuario, cliente };
    });

    return {
      id: result.usuario.id,
      correo: result.usuario.correo,
      rol: result.usuario.rol,
      cliente: {
        id: result.cliente.id,
        nombre: result.cliente.nombre,
        apellido: result.cliente.apellido,
        correo: result.cliente.correo,
        telefono: result.cliente.telefono ?? null,
      },
    };
  }
}
