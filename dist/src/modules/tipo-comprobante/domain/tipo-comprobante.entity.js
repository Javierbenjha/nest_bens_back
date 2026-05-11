"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComprobante = void 0;
const openapi = require("@nestjs/swagger");
class TipoComprobante {
    id;
    nombre;
    abreviatura;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String }, abreviatura: { required: true, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.TipoComprobante = TipoComprobante;
//# sourceMappingURL=tipo-comprobante.entity.js.map