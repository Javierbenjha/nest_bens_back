import { Injectable } from '@nestjs/common';
import { TypeDocumentRepository } from '../../domain/type-document.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeDocument } from '../../domain/type-document.entity';

@Injectable()
export class PrismaTypeDocumentRepository implements TypeDocumentRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(typeDocument: TypeDocument): Promise<TypeDocument> {
        const { id, createdAt, updatedAt, ...data } = typeDocument;
        return this.prisma.tipoDocumento.create({ data }) as unknown as TypeDocument;
    }

    async findAll(): Promise<TypeDocument[]> {
        return this.prisma.tipoDocumento.findMany() as unknown as TypeDocument[];
    }

    async findById(id: number): Promise<TypeDocument | null> {
        return this.prisma.tipoDocumento.findUnique({ where: { id } }) as unknown as TypeDocument | null;
    }

    async update(id: number, typeDocument: TypeDocument): Promise<TypeDocument> {
        const { id: _id, createdAt, updatedAt, ...data } = typeDocument;
        return this.prisma.tipoDocumento.update({ where: { id }, data }) as unknown as TypeDocument;
    }

    async delete(id: number): Promise<void> {
        await this.prisma.tipoDocumento.delete({ where: { id } });
    }
}
