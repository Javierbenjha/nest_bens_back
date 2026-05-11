import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { TipoComprobanteRepository } from '../domain/tipo-comprobante.repository';
import type { TipoComprobante } from '../domain/tipo-comprobante.entity';
import { CreateTipoComprobanteDto } from '../infrastructure/http/dto/create-tipo-comprobante.dto';
import { UpdateTipoComprobanteDto } from '../infrastructure/http/dto/update-tipo-comprobante.dto';

@Injectable()
export class TipoComprobanteService {
  constructor(
    @Inject('TipoComprobanteRepository')
    private readonly repo: TipoComprobanteRepository,
  ) {}

  findAll() {
    return this.repo.findAll();
  }

  create(dto: CreateTipoComprobanteDto): Promise<TipoComprobante> {
    return this.repo.create(dto as TipoComprobante);
  }

  async findOne(id: number): Promise<TipoComprobante> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException(`Tipo de comprobante #${id} no encontrado`);
    return found;
  }

  async update(id: number, dto: UpdateTipoComprobanteDto): Promise<TipoComprobante> {
    await this.findOne(id);
    return this.repo.update(id, dto as TipoComprobante);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
