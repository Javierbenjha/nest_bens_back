import { SuppliersService } from '../../application/suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<import("../../domain/supplier.entity").Supplier>;
    findAll(): Promise<import("../../domain/supplier.entity").Supplier[]>;
    findOne(id: string): Promise<import("../../domain/supplier.entity").Supplier | null>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<import("../../domain/supplier.entity").Supplier>;
    remove(id: string): Promise<void>;
}
