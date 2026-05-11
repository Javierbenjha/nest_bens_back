"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../domain/order.entity");
const order_item_entity_1 = require("../domain/order-item.entity");
let OrdersService = class OrdersService {
    orderRepository;
    couponRepository;
    productRepository;
    constructor(orderRepository, couponRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.couponRepository = couponRepository;
        this.productRepository = productRepository;
    }
    async create(dto) {
        const productIds = dto.detalles.map((d) => d.productoId);
        const uniqueProductIds = [...new Set(productIds)];
        const products = await this.productRepository.findManyByIds(uniqueProductIds);
        if (products.length !== uniqueProductIds.length) {
            throw new common_1.NotFoundException('Uno o más productos no fueron encontrados.');
        }
        const orderItems = dto.detalles.map((detail) => {
            const product = products.find((p) => p.id === detail.productoId);
            const precio = detail.precioUnitario ?? Number(product.precio);
            const tipoDescuento = detail.omitirDescuento ? 'SIN_DESCUENTO' : (product.tipoDescuento ?? 'SIN_DESCUENTO');
            const valorDescuento = detail.omitirDescuento ? 0 : Number(product.valorDescuento ?? 0);
            return order_item_entity_1.OrderItem.create(product.id, detail.tallaId, detail.colorId, detail.cantidad, precio, tipoDescuento, valorDescuento);
        });
        const order = new order_entity_1.Order(dto.clienteId, dto.usuarioId ?? null, orderItems, 0, 0, 0, 0, 0, null, dto.medioPagoId ?? null, dto.tipoComprobanteId ?? null, dto.direccionEnvio ?? null, dto.observaciones ?? null, dto.origen ?? 'ERP', dto.fechaEntrega ?? null);
        if (dto.cuponCodigo) {
            const coupon = await this.couponRepository.findByCode(dto.cuponCodigo);
            if (!coupon)
                throw new common_1.BadRequestException('El código de cupón no existe.');
            try {
                order.applyCoupon(coupon);
            }
            catch (error) {
                throw new common_1.BadRequestException(error.message);
            }
        }
        order.addTaxes(0);
        return this.orderRepository.save(order);
    }
    findAll() {
        return this.orderRepository.findAll();
    }
    findOne(id) {
        return this.orderRepository.findById(id);
    }
    confirmPayment(id, medioPagoId, tipoComprobanteId) {
        return this.orderRepository.confirmPayment(id, medioPagoId, tipoComprobanteId);
    }
    cancel(id) {
        return this.orderRepository.cancel(id);
    }
    findMyOrders(usuarioId) {
        return this.orderRepository.findByUsuarioId(usuarioId);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('OrderRepository')),
    __param(1, (0, common_1.Inject)('CouponRepository')),
    __param(2, (0, common_1.Inject)('ProductRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrdersService);
//# sourceMappingURL=orders.service.js.map