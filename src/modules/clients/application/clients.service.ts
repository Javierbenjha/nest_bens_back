import { Inject, Injectable } from '@nestjs/common';
import type { ClientRepository } from '../domain/client.repository';
import type { Client } from '../domain/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientRepository')
    private readonly repo: ClientRepository,
  ) {}

  create(client: Partial<Client>): Promise<Client> {
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
