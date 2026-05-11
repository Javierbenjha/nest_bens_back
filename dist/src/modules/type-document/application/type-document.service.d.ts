import type { TypeDocumentRepository } from '../domain/type-document.repository';
import type { TypeDocument } from '../domain/type-document.entity';
import { CreateTypeDocumentDto } from '../infrastructure/http/dto/create-type-document.dto';
import { UpdateTypeDocumentDto } from '../infrastructure/http/dto/update-type-document.dto';
export declare class TypeDocumentService {
    private readonly repo;
    constructor(repo: TypeDocumentRepository);
    create(dto: CreateTypeDocumentDto): Promise<TypeDocument>;
    findAll(): Promise<TypeDocument[]>;
    findOne(id: number): Promise<TypeDocument>;
    update(id: number, dto: UpdateTypeDocumentDto): Promise<TypeDocument>;
    remove(id: number): Promise<void>;
}
