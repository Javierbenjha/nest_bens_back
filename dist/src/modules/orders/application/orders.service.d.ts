import { CreateOrderDto } from '../infrastructure/http/dto/create-order.dto';
import type { OrderRepository } from '../domain/order.repository';
import type { CouponRepository } from '../../coupons/domain/coupon.repository';
import type { ProductRepository } from '../../products/domain/product.repository';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly couponRepository;
    private readonly productRepository;
    constructor(orderRepository: OrderRepository, couponRepository: CouponRepository, productRepository: ProductRepository);
    create(dto: CreateOrderDto): Promise<unknown>;
    findAll(): Promise<unknown[]>;
    findOne(id: number): Promise<unknown>;
    confirmPayment(id: number, medioPagoId: number, tipoComprobanteId?: number): Promise<unknown>;
    cancel(id: number): Promise<unknown>;
    findMyOrders(usuarioId: number): Promise<unknown[]>;
}
