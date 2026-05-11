import { ClientsService } from '../../application/clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("../../domain/client.entity").Client>;
    findAll(): Promise<import("../../domain/client.entity").Client[]>;
    findOne(id: string): Promise<import("../../domain/client.entity").Client | null>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("../../domain/client.entity").Client>;
    remove(id: string): Promise<void>;
}
