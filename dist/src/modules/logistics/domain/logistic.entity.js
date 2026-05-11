"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logistic = void 0;
const openapi = require("@nestjs/swagger");
class Logistic {
    id;
    estado;
    fechaEntrega;
    direccionEnvio;
    observaciones;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, estado: { required: true, type: () => String }, fechaEntrega: { required: false, type: () => Date, nullable: true }, direccionEnvio: { required: false, type: () => String, nullable: true }, observaciones: { required: false, type: () => String, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.Logistic = Logistic;
//# sourceMappingURL=logistic.entity.js.map