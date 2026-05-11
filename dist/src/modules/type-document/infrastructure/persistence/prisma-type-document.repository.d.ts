import { TypeDocumentRepository } from '../../domain/type-document.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeDocument } from '../../domain/type-document.entity';
export declare class PrismaTypeDocumentRepository implements TypeDocumentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(typeDocument: TypeDocument): Promise<TypeDocument>;
    findAll(): Promise<TypeDocument[]>;
    findById(id: number): Promise<TypeDocument | null>;
    update(id: number, typeDocument: TypeDocument): Promise<TypeDocument>;
    delete(id: number): Promise<void>;
}
