"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
class Order {
    clienteId;
    usuarioId;
    items;
    subtotal;
    impuesto;
    descuento;
    descuentoCupon;
    total;
    cuponId;
    medioPagoId;
    tipoComprobanteId;
    direccionEnvio;
    observaciones;
    origen;
    fechaEntrega;
    constructor(clienteId, usuarioId, items, subtotal = 0, impuesto = 0, descuento = 0, descuentoCupon = 0, total = 0, cuponId = null, medioPagoId = null, tipoComprobanteId = null, direccionEnvio = null, observaciones = null, origen = 'ERP', fechaEntrega = null) {
        this.clienteId = clienteId;
        this.usuarioId = usuarioId;
        this.items = items;
        this.subtotal = subtotal;
        this.impuesto = impuesto;
        this.descuento = descuento;
        this.descuentoCupon = descuentoCupon;
        this.total = total;
        this.cuponId = cuponId;
        this.medioPagoId = medioPagoId;
        this.tipoComprobanteId = tipoComprobanteId;
        this.direccionEnvio = direccionEnvio;
        this.observaciones = observaciones;
        this.origen = origen;
        this.fechaEntrega = fechaEntrega;
        this.calculateTotals();
    }
    calculateTotals() {
        this.subtotal = this.items.reduce((acc, item) => acc + item.subtotal, 0);
        this.descuento = this.items.reduce((acc, item) => acc + item.descuento, 0);
        this.total = this.subtotal;
    }
    applyCoupon(coupon) {
        if (!coupon.isValid()) {
            throw new Error('El cupón no es válido, ya expiró o no tiene usos disponibles.');
        }
        this.descuentoCupon = coupon.calculateDiscount(this.subtotal);
        this.descuento += this.descuentoCupon;
        this.total -= this.descuentoCupon;
        this.cuponId = coupon.id;
    }
    addTaxes(taxRate) {
        this.impuesto = this.total * taxRate;
        this.total += this.impuesto;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map