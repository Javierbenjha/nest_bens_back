import { Address } from './address.entity';

export interface AddressRepository {
  create(address: Address): Promise<Address>;
  findByClienteId(clienteId: number): Promise<Address[]>;
  findById(id: number): Promise<Address | null>;
  findClienteIdByUsuarioId(usuarioId: number): Promise<number | null>;
  update(id: number, data: Partial<Address>): Promise<Address>;
  setPrimary(id: number, clienteId: number): Promise<void>;
  delete(id: number): Promise<void>;
}
