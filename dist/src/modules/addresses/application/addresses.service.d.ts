import type { AddressRepository } from '../domain/address.repository';
import type { Address } from '../domain/address.entity';
export declare class AddressesService {
    private readonly repo;
    constructor(repo: AddressRepository);
    private resolveClienteId;
    create(usuarioId: number, data: Omit<Address, 'clienteId'>): Promise<Address>;
    findMine(usuarioId: number): Promise<Address[]>;
    update(id: number, usuarioId: number, data: Partial<Address>): Promise<Address>;
    setPrimary(id: number, usuarioId: number): Promise<void>;
    remove(id: number, usuarioId: number): Promise<void>;
}
