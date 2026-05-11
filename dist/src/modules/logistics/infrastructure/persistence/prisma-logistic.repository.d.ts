import { PrismaService } from 'src/prisma/prisma.service';
import { LogisticRepository } from '../../domain/logistic.repository';
import { DeliverData, Logistic } from '../../domain/logistic.entity';
export declare class PrismaLogisticRepository implements LogisticRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPending(): Promise<Logistic[]>;
    findAll(): Promise<Logistic[]>;
    findById(id: number): Promise<Logistic | null>;
    dispatch(id: number): Promise<Logistic>;
    deliver(id: number, data: DeliverData): Promise<Logistic>;
}
