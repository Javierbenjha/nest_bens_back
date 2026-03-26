import { Order } from './order.entity';

export interface OrderRepository {
  save(order: Order): Promise<any>;
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
}
