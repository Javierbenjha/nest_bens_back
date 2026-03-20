import { Item } from './item.entity';

export interface ItemRepository {
  create(item: Item): Promise<Item>;
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  update(id: number, item: Partial<Item>): Promise<Item>;
  delete(id: number): Promise<void>;
}
