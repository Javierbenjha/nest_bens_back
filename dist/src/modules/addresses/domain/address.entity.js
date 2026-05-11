"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const openapi = require("@nestjs/swagger");
class Address {
    id;
    clienteId;
    alias;
    direccion;
    distrito;
    provincia;
    departamento;
    referencia;
    esPrincipal;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, clienteId: { required: true, type: () => Number }, alias: { required: true, type: () => String }, direccion: { required: true, type: () => String }, distrito: { required: true, type: () => String }, provincia: { required: true, type: () => String }, departamento: { required: true, type: () => String }, referencia: { required: false, type: () => String, nullable: true }, esPrincipal: { required: true, type: () => Boolean }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.Address = Address;
//# sourceMappingURL=address.entity.js.map