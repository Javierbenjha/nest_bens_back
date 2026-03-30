import { PaymentMethod } from './payment-method.entity';

export interface PaymentMethodRepository {
    create(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    findAll(): Promise<PaymentMethod[]>;
    findById(id: number): Promise<PaymentMethod | null>;
    update(id: number, paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    delete(id: number): Promise<void>;
}
