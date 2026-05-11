import { DeliverData, Logistic } from './logistic.entity';

export interface LogisticRepository {
  findPending(): Promise<Logistic[]>;
  findAll(): Promise<Logistic[]>;
  findById(id: number): Promise<Logistic | null>;
  dispatch(id: number): Promise<Logistic>;
  deliver(id: number, data: DeliverData): Promise<Logistic>;
}
