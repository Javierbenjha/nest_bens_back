import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PurchaseRepository } from '../domain/purchase.repository';
import type { Purchase } from '../domain/purchase.entity';
import { CreatePurchaseDto } from '../infrastructure/http/dto/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PurchaseRepository')
    private readonly repo: PurchaseRepository,
  ) {}

  create(dto: CreatePurchaseDto): Promise<Purchase> {
    return this.repo.create(dto as Purchase);
  }

  findAll(): Promise<Purchase[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Purchase> {
    const purchase = await this.repo.findById(id);
    if (!purchase) throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    return purchase;
  }

  async anular(id: number): Promise<Purchase> {
    const purchase = await this.repo.findById(id);
    if (!purchase) throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    if (purchase.estado === 'ANULADO') throw new BadRequestException(`La compra ${id} ya está anulada`);
    return this.repo.anular(id);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
