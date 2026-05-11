import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierRepository } from '../../domain/supplier.repository';
import { Supplier } from '../../domain/supplier.entity';
export declare class PrismaSupplierRepository implements SupplierRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(supplier: Supplier): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | null>;
    findByDocumento(documento: string): Promise<Supplier | null>;
    findByEmail(correo: string): Promise<Supplier | null>;
    update(id: number, supplier: Partial<Supplier>): Promise<Supplier>;
    delete(id: number): Promise<void>;
}
