"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const openapi = require("@nestjs/swagger");
class PaymentMethod {
    id;
    nombre;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.PaymentMethod = PaymentMethod;
//# sourceMappingURL=payment-method.entity.js.map