import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressRepository } from '../../domain/address.repository';
import { Address } from '../../domain/address.entity';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findClienteIdByUsuarioId(usuarioId: number): Promise<number | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { usuarioId },
      select: { id: true },
    });
    return cliente?.id ?? null;
  }

  async create(address: Address): Promise<Address> {
    return this.prisma.direccion.create({ data: address }) as unknown as Address;
  }

  async findByClienteId(clienteId: number): Promise<Address[]> {
    return this.prisma.direccion.findMany({
      where: { clienteId },
      orderBy: [{ esPrincipal: 'desc' }, { createdAt: 'asc' }],
    }) as unknown as Address[];
  }

  async findById(id: number): Promise<Address | null> {
    return this.prisma.direccion.findUnique({ where: { id } }) as unknown as Address | null;
  }

  async update(id: number, data: Partial<Address>): Promise<Address> {
    return this.prisma.direccion.update({ where: { id }, data }) as unknown as Address;
  }

  async setPrimary(id: number, clienteId: number): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.direccion.updateMany({
        where: { clienteId },
        data: { esPrincipal: false },
      }),
      this.prisma.direccion.update({
        where: { id },
        data: { esPrincipal: true },
      }),
    ]);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.direccion.delete({ where: { id } });
  }
}
