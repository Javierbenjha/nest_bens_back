"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const openapi = require("@nestjs/swagger");
class OrderItem {
    productoId;
    tallaId;
    colorId;
    cantidad;
    precioUnitario;
    descuento;
    subtotal;
    constructor(productoId, tallaId, colorId, cantidad, precioUnitario, descuento, subtotal) {
        this.productoId = productoId;
        this.tallaId = tallaId;
        this.colorId = colorId;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.descuento = descuento;
        this.subtotal = subtotal;
    }
    static create(productoId, tallaId, colorId, cantidad, precio, tipoDescuento, valorDescuentoProducto) {
        let descuentoUnitario = 0;
        if (tipoDescuento === 'PORCENTAJE') {
            descuentoUnitario = precio * (valorDescuentoProducto / 100);
        }
        else if (tipoDescuento === 'VALOR_FIJO') {
            descuentoUnitario = valorDescuentoProducto;
        }
        const precioConDescuento = precio - descuentoUnitario;
        const subtotal = precioConDescuento * cantidad;
        return new OrderItem(productoId, tallaId, colorId, cantidad, precio, descuentoUnitario * cantidad, subtotal);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.OrderItem = OrderItem;
//# sourceMappingURL=order-item.entity.js.map