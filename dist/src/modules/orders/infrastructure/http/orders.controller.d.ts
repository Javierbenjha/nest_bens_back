import { CreateOrderDto } from './dto/create-order.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { OrdersService } from '../../application/orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto): Promise<unknown>;
    findAll(): Promise<unknown[]>;
    getMyOrders(req: any): Promise<unknown[]>;
    findOne(id: number): Promise<unknown>;
    confirmPayment(id: number, dto: ConfirmPaymentDto): Promise<unknown>;
    cancel(id: number): Promise<unknown>;
}
