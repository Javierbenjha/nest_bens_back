import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { ClientRepository } from '../domain/client.repository';
import type { Client } from '../domain/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientRepository')
    private readonly repo: ClientRepository,
  ) {}

  async create(client: Partial<Client>): Promise<Client> {
    // Check if client with same document exists
    if (client.documento) {
      const existingByDoc = await this.repo.findByDocumento(client.documento);
      if (existingByDoc) {
        throw new ConflictException(`Ya existe un cliente con el documento ${client.documento}`);
      }
    }

    // Check if client with same email exists
    if (client.correo) {
      const existingByEmail = await this.repo.findByEmail(client.correo);
      if (existingByEmail) {
        throw new ConflictException(`Ya existe un cliente con el correo ${client.correo}`);
      }
    }

    return this.repo.create(client as Client);
  }

  findAll(): Promise<Client[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Client | null> {
    return this.repo.findById(id);
  }

  update(id: number, client: Partial<Client>): Promise<Client> {
    return this.repo.update(id, client);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
