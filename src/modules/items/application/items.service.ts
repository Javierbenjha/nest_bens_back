import { Inject, Injectable } from '@nestjs/common';
import type { ItemRepository } from '../domain/item.repository';
import type { Item } from '../domain/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ItemRepository')
    private readonly repo: ItemRepository,
  ) {}

  create(item: Partial<Item>): Promise<Item> {
    return this.repo.create(item as Item);
  }

  findAll(): Promise<Item[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Item | null> {
    return this.repo.findById(id);
  }

  update(id: number, item: Partial<Item>): Promise<Item> {
    return this.repo.update(id, item);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
