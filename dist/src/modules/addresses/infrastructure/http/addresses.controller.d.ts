import { AddressesService } from '../../application/addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(req: any, dto: CreateAddressDto): Promise<import("../../domain/address.entity").Address>;
    findMine(req: any): Promise<import("../../domain/address.entity").Address[]>;
    update(id: number, req: any, dto: UpdateAddressDto): Promise<import("../../domain/address.entity").Address>;
    setPrimary(id: number, req: any): Promise<void>;
    remove(id: number, req: any): Promise<void>;
}
