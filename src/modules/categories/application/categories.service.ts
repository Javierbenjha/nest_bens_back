import { Inject, Injectable } from '@nestjs/common';
import type { CategoryRepository } from '../domain/category.repository';
import type { Category } from '../domain/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoryRepository')
    private readonly repo: CategoryRepository,
  ) {}

  create(category: Category): Promise<Category> {
    return this.repo.create(category);
  }

  findAll(): Promise<Category[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Category | null> {
    return this.repo.findById(id);
  }

  update(id: number, category: Partial<Category>): Promise<Category> {
    return this.repo.update(id, category);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
