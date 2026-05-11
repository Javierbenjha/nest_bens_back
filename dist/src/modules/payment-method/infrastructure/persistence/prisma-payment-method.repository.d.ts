import { PaymentMethodRepository } from '../../domain/payment-method.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentMethod } from '../../domain/payment-method.entity';
export declare class PrismaPaymentMethodRepository implements PaymentMethodRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    findAll(): Promise<PaymentMethod[]>;
    findById(id: number): Promise<PaymentMethod | null>;
    update(id: number, paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    delete(id: number): Promise<void>;
}
