"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const openapi = require("@nestjs/swagger");
class Coupon {
    id;
    codigo;
    valor;
    tipo;
    usosMaximos;
    usosActuales;
    activo;
    fechaExpiracion;
    constructor(id, codigo, valor, tipo, usosMaximos, usosActuales, activo, fechaExpiracion) {
        this.id = id;
        this.codigo = codigo;
        this.valor = valor;
        this.tipo = tipo;
        this.usosMaximos = usosMaximos;
        this.usosActuales = usosActuales;
        this.activo = activo;
        this.fechaExpiracion = fechaExpiracion;
    }
    isValid() {
        const now = new Date();
        if (!this.activo)
            return false;
        if (this.fechaExpiracion && this.fechaExpiracion < now)
            return false;
        if (this.usosMaximos !== null && this.usosActuales >= this.usosMaximos)
            return false;
        return true;
    }
    calculateDiscount(subtotal) {
        if (this.tipo === 'PORCENTAJE') {
            return subtotal * (this.valor / 100);
        }
        return Math.min(this.valor, subtotal);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.Coupon = Coupon;
//# sourceMappingURL=coupon.entity.js.map