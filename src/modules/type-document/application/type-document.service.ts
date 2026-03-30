import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TypeDocumentRepository } from '../domain/type-document.repository';
import type { TypeDocument } from '../domain/type-document.entity';
import { CreateTypeDocumentDto } from '../infrastructure/http/dto/create-type-document.dto';
import { UpdateTypeDocumentDto } from '../infrastructure/http/dto/update-type-document.dto';

@Injectable()
export class TypeDocumentService {
  constructor(
    @Inject('TypeDocumentRepository')
    private readonly repo: TypeDocumentRepository,
  ) {}

  create(dto: CreateTypeDocumentDto): Promise<TypeDocument> {
    return this.repo.create(dto as TypeDocument);
  }

  findAll(): Promise<TypeDocument[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<TypeDocument> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException(`Tipo de documento #${id} no encontrado`);
    return found;
  }

  async update(id: number, dto: UpdateTypeDocumentDto): Promise<TypeDocument> {
    await this.findOne(id);
    return this.repo.update(id, dto as TypeDocument);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
