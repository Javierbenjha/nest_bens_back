import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientRepository } from '../../domain/client.repository';
import { Client } from '../../domain/client.entity';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(client: Client): Promise<Client> {
    return this.prisma.cliente.create({
      data: client as any,
    }) as unknown as Client;
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.cliente.findMany() as unknown as Client[];
  }

  async findById(id: number): Promise<Client | null> {
    return this.prisma.cliente.findUnique({ where: { id } }) as unknown as Client | null;
  }

  async update(id: number, client: Partial<Client>): Promise<Client> {
    return this.prisma.cliente.update({
      where: { id },
      data: client as any,
    }) as unknown as Client;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.cliente.delete({ where: { id } });
  }
}
