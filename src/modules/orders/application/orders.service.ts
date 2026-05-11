import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../infrastructure/http/dto/create-order.dto';
import { Order } from '../domain/order.entity';
import { OrderItem } from '../domain/order-item.entity';
import type { OrderRepository } from '../domain/order.repository';
import type { CouponRepository } from '../../coupons/domain/coupon.repository';
import type { ProductRepository } from '../../products/domain/product.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject('CouponRepository')
    private readonly couponRepository: CouponRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async create(dto: CreateOrderDto): Promise<unknown> {
    // 1. Obtener datos de productos (precios y descuentos)
    const productIds = dto.detalles.map((d) => d.productoId);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepository.findManyByIds(uniqueProductIds);

    if (products.length !== uniqueProductIds.length) {
      throw new NotFoundException('Uno o más productos no fueron encontrados.');
    }

    // 2. Crear los ítems del pedido con precios y descuentos reales
    const orderItems = dto.detalles.map((detail) => {
      const product = products.find((p) => p.id === detail.productoId)!;
      // Usa el precio enviado por el frontend (precio por variante/talla);
      // si no viene, cae al precio base del producto.
      const precio = detail.precioUnitario ?? Number(product.precio);
      const tipoDescuento = detail.omitirDescuento ? 'SIN_DESCUENTO' : (product.tipoDescuento ?? 'SIN_DESCUENTO');
      const valorDescuento = detail.omitirDescuento ? 0 : Number(product.valorDescuento ?? 0);
      return OrderItem.create(
        product.id!,
        detail.tallaId,
        detail.colorId,
        detail.cantidad,
        precio,
        tipoDescuento,
        valorDescuento,
      );
    });

    // 3. Crear la entidad Order (calcula subtotales automáticamente)
    const order = new Order(
      dto.clienteId,
      dto.usuarioId ?? null,
      orderItems,
      0, 0, 0, 0, 0,
      null,
      dto.medioPagoId ?? null,
      dto.tipoComprobanteId ?? null,
      dto.direccionEnvio ?? null,
      dto.observaciones ?? null,
      dto.origen ?? 'ERP',
      dto.fechaEntrega ?? null,
    );

    // 4. Aplicar cupón si existe
    if (dto.cuponCodigo) {
      const coupon = await this.couponRepository.findByCode(dto.cuponCodigo);
      if (!coupon) throw new BadRequestException('El código de cupón no existe.');
      try {
        order.applyCoupon(coupon);
      } catch (error) {
        throw new BadRequestException((error as Error).message);
      }
    }

    // 5. Aplicar impuestos (0 por ahora)
    order.addTaxes(0);

    // 6. Persistir (el repositorio valida stock y descuenta inventario en transacción)
    return this.orderRepository.save(order);
  }

  findAll(): Promise<unknown[]> {
    return this.orderRepository.findAll();
  }

  findOne(id: number): Promise<unknown> {
    return this.orderRepository.findById(id);
  }

  confirmPayment(id: number, medioPagoId: number, tipoComprobanteId?: number): Promise<unknown> {
    return this.orderRepository.confirmPayment(id, medioPagoId, tipoComprobanteId);
  }

  cancel(id: number): Promise<unknown> {
    return this.orderRepository.cancel(id);
  }

  findMyOrders(usuarioId: number): Promise<unknown[]> {
    return this.orderRepository.findByUsuarioId(usuarioId);
  }
}
