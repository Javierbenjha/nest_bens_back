import { Client } from './client.entity';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  findByDocumento(documento: string): Promise<Client | null>;
  findByEmail(correo: string): Promise<Client | null>;
  update(id: number, client: Partial<Client>): Promise<Client>;
  delete(id: number): Promise<void>;
}
