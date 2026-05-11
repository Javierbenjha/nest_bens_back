"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovement = void 0;
const openapi = require("@nestjs/swagger");
class StockMovement {
    id;
    inventarioId;
    tipo;
    cantidad;
    stockAntes;
    stockDespues;
    referencia;
    notas;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, inventarioId: { required: true, type: () => Number }, tipo: { required: true, type: () => Object }, cantidad: { required: true, type: () => Number }, stockAntes: { required: true, type: () => Number }, stockDespues: { required: true, type: () => Number }, referencia: { required: false, type: () => String }, notas: { required: false, type: () => String }, createdAt: { required: false, type: () => Date } };
    }
}
exports.StockMovement = StockMovement;
//# sourceMappingURL=stock-movement.entity.js.map