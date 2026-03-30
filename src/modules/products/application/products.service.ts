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

  async findAll(page?: number, limit?: number) {
    const { data, total } = await this.repo.findAll(page, limit);
    return {
      data,
      meta: {
        total,
        page: page || 1,
        lastPage: limit ? Math.ceil(total / limit) : 1,
        limit: limit || total,
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
