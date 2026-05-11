import { PrismaService } from 'src/prisma/prisma.service';
import { AddressRepository } from '../../domain/address.repository';
import { Address } from '../../domain/address.entity';
export declare class PrismaAddressRepository implements AddressRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findClienteIdByUsuarioId(usuarioId: number): Promise<number | null>;
    create(address: Address): Promise<Address>;
    findByClienteId(clienteId: number): Promise<Address[]>;
    findById(id: number): Promise<Address | null>;
    update(id: number, data: Partial<Address>): Promise<Address>;
    setPrimary(id: number, clienteId: number): Promise<void>;
    delete(id: number): Promise<void>;
}
