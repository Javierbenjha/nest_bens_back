import { Inject, Injectable } from '@nestjs/common';
import type { BrandRepository } from '../domain/brand.repository';
import type { Brand } from '../domain/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandRepository')
    private readonly repo: BrandRepository,
  ) {}

  create(brand: Partial<Brand>): Promise<Brand> {
    return this.repo.create(brand as Brand);
  }

  findAll(): Promise<Brand[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Brand | null> {
    return this.repo.findById(id);
  }

  update(id: number, brand: Partial<Brand>): Promise<Brand> {
    return this.repo.update(id, brand);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
