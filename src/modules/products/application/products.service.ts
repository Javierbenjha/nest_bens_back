import { Inject, Injectable } from '@nestjs/common';
import type { ProductRepository } from '../domain/product.repository';
import type { Product } from '../domain/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private readonly repo: ProductRepository,
  ) {}

  create(product: Partial<Product>): Promise<Product> {
    return this.repo.create(product as Product);
  }

  findAll(): Promise<Product[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Product | null> {
    return this.repo.findById(id);
  }

  update(id: number, product: Partial<Product>): Promise<Product> {
    return this.repo.update(id, product);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
