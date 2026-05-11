import type { PaymentMethodRepository } from '../domain/payment-method.repository';
import type { PaymentMethod } from '../domain/payment-method.entity';
import { CreatePaymentMethodDto } from '../infrastructure/http/dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../infrastructure/http/dto/update-payment-method.dto';
export declare class PaymentMethodService {
    private readonly repo;
    constructor(repo: PaymentMethodRepository);
    create(dto: CreatePaymentMethodDto): Promise<PaymentMethod>;
    findAll(): Promise<PaymentMethod[]>;
    findOne(id: number): Promise<PaymentMethod>;
    update(id: number, dto: UpdatePaymentMethodDto): Promise<PaymentMethod>;
    remove(id: number): Promise<void>;
}
