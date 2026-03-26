import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from '../infrastructure/http/dto/create-order.dto';
import { Order } from '../domain/order.entity';
import { OrderItem } from '../domain/order-item.entity';
import { PrismaOrderRepository } from '../infrastructure/persistence/prisma-order.repository';
import { PrismaCouponRepository } from '../../coupons/infrastructure/persistence/prisma-coupon.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: PrismaOrderRepository,
    private readonly couponRepository: PrismaCouponRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateOrderDto) {
    // 1. Obtener detalles de productos (precios y descuentos)
    const productIds = dto.detalles.map(d => d.productoId);
    const products = await this.prisma.producto.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Uno o más productos no fueron encontrados.');
    }

    // 2. Crear los ítems del pedido (aplicando el descuento unitario por producto)
    const orderItems = dto.detalles.map(detail => {
      const product = products.find(p => p.id === detail.productoId);
      return OrderItem.create(
        product!.id,
        detail.cantidad,
        Number(product!.precio),
        Number((product as any).descuento || 0),
      );
    });

    // 3. Crear la entidad Order (calcula subtotales iniciales)
    const order = new Order(
      dto.clienteId,
      dto.usuarioId ?? null,
      orderItems,
    );

    // 4. Aplicar cupón si existe
    if (dto.cuponCodigo) {
      const coupon = await this.couponRepository.findByCode(dto.cuponCodigo);
      if (!coupon) {
        throw new BadRequestException('El código de cupón no existe.');
      }
      
      try {
        order.applyCoupon(coupon);
      } catch (error) {
        throw new BadRequestException((error as Error).message);
      }
    }

    // 5. Opcional: Agregar impuestos
    order.addTaxes(0); // Supongamos 0 por ahora

    // 6. Persistir en la base de datos
    return this.orderRepository.save(order);
  }

  findAll(): Promise<any[]> {
    return this.orderRepository.findAll();
  }

  findOne(id: number): Promise<any> {
    return this.orderRepository.findById(id);
  }
}
