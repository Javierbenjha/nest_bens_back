import type { LogisticRepository } from '../domain/logistic.repository';
import type { DeliverData, Logistic } from '../domain/logistic.entity';
export declare class LogisticsService {
    private readonly repo;
    constructor(repo: LogisticRepository);
    findPending(): Promise<Logistic[]>;
    findAll(): Promise<Logistic[]>;
    findOne(id: number): Promise<Logistic>;
    dispatch(id: number): Promise<Logistic>;
    deliver(id: number, data: DeliverData): Promise<Logistic>;
}
