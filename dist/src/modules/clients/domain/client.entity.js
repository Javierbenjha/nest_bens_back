"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const openapi = require("@nestjs/swagger");
class Client {
    id;
    tipoDocumentoId;
    documento;
    nombre;
    apellido;
    correo;
    telefono;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, tipoDocumentoId: { required: false, type: () => Number }, documento: { required: true, type: () => String }, nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, correo: { required: true, type: () => String }, telefono: { required: false, type: () => String, nullable: true }, createdAt: { required: false, type: () => Date } };
    }
}
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map