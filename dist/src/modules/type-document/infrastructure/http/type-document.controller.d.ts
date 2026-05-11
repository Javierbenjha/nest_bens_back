import { TypeDocumentService } from '../../application/type-document.service';
import { CreateTypeDocumentDto } from './dto/create-type-document.dto';
import { UpdateTypeDocumentDto } from './dto/update-type-document.dto';
export declare class TypeDocumentController {
    private readonly typeDocumentService;
    constructor(typeDocumentService: TypeDocumentService);
    create(createTypeDocumentDto: CreateTypeDocumentDto): Promise<import("../../domain/type-document.entity").TypeDocument>;
    findAll(): Promise<import("../../domain/type-document.entity").TypeDocument[]>;
    findOne(id: string): Promise<import("../../domain/type-document.entity").TypeDocument>;
    update(id: string, updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<import("../../domain/type-document.entity").TypeDocument>;
    remove(id: string): Promise<void>;
}
