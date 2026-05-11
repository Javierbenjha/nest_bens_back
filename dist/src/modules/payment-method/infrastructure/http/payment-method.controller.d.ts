import { PaymentMethodService } from '../../application/payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
export declare class PaymentMethodController {
    private readonly paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<import("../../domain/payment-method.entity").PaymentMethod>;
    findAll(): Promise<import("../../domain/payment-method.entity").PaymentMethod[]>;
    findOne(id: string): Promise<import("../../domain/payment-method.entity").PaymentMethod>;
    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<import("../../domain/payment-method.entity").PaymentMethod>;
    remove(id: string): Promise<void>;
}
