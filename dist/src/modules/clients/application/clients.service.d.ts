import type { ClientRepository } from '../domain/client.repository';
import type { Client } from '../domain/client.entity';
export declare class ClientsService {
    private readonly repo;
    constructor(repo: ClientRepository);
    create(client: Partial<Client>): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
    update(id: number, client: Partial<Client>): Promise<Client>;
    remove(id: number): Promise<void>;
}
