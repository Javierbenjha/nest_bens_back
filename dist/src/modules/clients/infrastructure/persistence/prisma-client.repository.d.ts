import { PrismaService } from 'src/prisma/prisma.service';
import { ClientRepository } from '../../domain/client.repository';
import { Client } from '../../domain/client.entity';
export declare class PrismaClientRepository implements ClientRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(client: Client): Promise<Client>;
    findAll(): Promise<Client[]>;
    findById(id: number): Promise<Client | null>;
    findByDocumento(documento: string): Promise<Client | null>;
    findByEmail(correo: string): Promise<Client | null>;
    update(id: number, client: Partial<Client>): Promise<Client>;
    delete(id: number): Promise<void>;
}
