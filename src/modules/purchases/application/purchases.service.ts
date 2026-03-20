import { Inject, Injectable } from '@nestjs/common';
import type { PurchaseRepository } from '../domain/purchase.repository';
import type { Purchase } from '../domain/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PurchaseRepository')
    private readonly repo: PurchaseRepository,
  ) {}

  create(purchase: Partial<Purchase>): Promise<Purchase> {
    return this.repo.create(purchase as Purchase);
  }

  findAll(): Promise<Purchase[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Purchase | null> {
    return this.repo.findById(id);
  }

  update(id: number, purchase: Partial<Purchase>): Promise<Purchase> {
    return this.repo.update(id, purchase);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
