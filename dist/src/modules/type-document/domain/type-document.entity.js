"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDocument = void 0;
const openapi = require("@nestjs/swagger");
class TypeDocument {
    id;
    nombre;
    abreviatura;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String }, abreviatura: { required: true, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.TypeDocument = TypeDocument;
//# sourceMappingURL=type-document.entity.js.map