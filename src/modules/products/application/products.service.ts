import { Inject, Injectable } from '@nestjs/common';
import type { ProductFilters, ProductRepository } from '../domain/product.repository';
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

  async findAll(filters: ProductFilters = {}) {
    const { page = 1, limit = 10 } = filters;
    const { data, total } = await this.repo.findAll(filters);
    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit) || 1,
        limit,
      },
    };
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
