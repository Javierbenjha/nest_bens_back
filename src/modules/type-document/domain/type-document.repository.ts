import { TypeDocument } from './type-document.entity'

export interface TypeDocumentRepository {
    create(typeDocument: TypeDocument): Promise<TypeDocument>;
    findAll(): Promise<TypeDocument[]>;
    findById(id: number): Promise<TypeDocument | null>;
    update(id: number, typeDocument: TypeDocument): Promise<TypeDocument>;
    delete(id: number): Promise<void>;
}
