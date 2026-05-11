"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const openapi = require("@nestjs/swagger");
class Sale {
    id;
    pedidoId;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, pedidoId: { required: true, type: () => Number }, createdAt: { required: false, type: () => Date } };
    }
}
exports.Sale = Sale;
//# sourceMappingURL=sale.entity.js.map