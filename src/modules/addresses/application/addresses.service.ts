import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import type { AddressRepository } from '../domain/address.repository';
import type { Address } from '../domain/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @Inject('AddressRepository')
    private readonly repo: AddressRepository,
  ) {}

  private async resolveClienteId(usuarioId: number): Promise<number> {
    const clienteId = await this.repo.findClienteIdByUsuarioId(usuarioId);
    if (!clienteId) throw new NotFoundException('No se encontró un cliente asociado a este usuario');
    return clienteId;
  }

  async create(usuarioId: number, data: Omit<Address, 'clienteId'>): Promise<Address> {
    const clienteId = await this.resolveClienteId(usuarioId);
    return this.repo.create({ ...data, clienteId });
  }

  async findMine(usuarioId: number): Promise<Address[]> {
    const clienteId = await this.resolveClienteId(usuarioId);
    return this.repo.findByClienteId(clienteId);
  }

  async update(id: number, usuarioId: number, data: Partial<Address>): Promise<Address> {
    const clienteId = await this.resolveClienteId(usuarioId);
    const address = await this.repo.findById(id);
    if (!address) throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    if (address.clienteId !== clienteId) throw new ForbiddenException('No tienes acceso a esta dirección');
    return this.repo.update(id, data);
  }

  async setPrimary(id: number, usuarioId: number): Promise<void> {
    const clienteId = await this.resolveClienteId(usuarioId);
    const address = await this.repo.findById(id);
    if (!address) throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    if (address.clienteId !== clienteId) throw new ForbiddenException('No tienes acceso a esta dirección');
    return this.repo.setPrimary(id, clienteId);
  }

  async remove(id: number, usuarioId: number): Promise<void> {
    const clienteId = await this.resolveClienteId(usuarioId);
    const address = await this.repo.findById(id);
    if (!address) throw new NotFoundException(`Dirección con ID ${id} no encontrada`);
    if (address.clienteId !== clienteId) throw new ForbiddenException('No tienes acceso a esta dirección');
    return this.repo.delete(id);
  }
}
