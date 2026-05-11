"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionOrder = void 0;
const openapi = require("@nestjs/swagger");
class ProductionOrder {
    id;
    productoId;
    tallaId;
    colorId;
    cantidadPlanificada;
    cantidadProducida;
    estado;
    usuarioId;
    observaciones;
    fechaInicio;
    fechaFin;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, productoId: { required: true, type: () => Number }, tallaId: { required: false, type: () => Number, nullable: true }, colorId: { required: false, type: () => Number, nullable: true }, cantidadPlanificada: { required: true, type: () => Number }, cantidadProducida: { required: true, type: () => Number }, estado: { required: true, type: () => Object }, usuarioId: { required: false, type: () => Number, nullable: true }, observaciones: { required: false, type: () => String, nullable: true }, fechaInicio: { required: false, type: () => Date, nullable: true }, fechaFin: { required: false, type: () => Date, nullable: true }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.ProductionOrder = ProductionOrder;
//# sourceMappingURL=production-order.entity.js.map