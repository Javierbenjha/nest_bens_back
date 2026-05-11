"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const openapi = require("@nestjs/swagger");
class Supplier {
    id;
    documento;
    nombre;
    descripcion;
    correo;
    telefono;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, documento: { required: true, type: () => String }, nombre: { required: false, type: () => String }, descripcion: { required: false, type: () => String, nullable: true }, correo: { required: true, type: () => String }, telefono: { required: false, type: () => String, nullable: true }, createdAt: { required: false, type: () => Date } };
    }
}
exports.Supplier = Supplier;
//# sourceMappingURL=supplier.entity.js.map