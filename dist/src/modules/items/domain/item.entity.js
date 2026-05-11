"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const openapi = require("@nestjs/swagger");
class Item {
    id;
    nombre;
    descripcion;
    cantidad;
    precio;
    unidad;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String, nullable: true }, cantidad: { required: true, type: () => Number }, precio: { required: true, type: () => Number }, unidad: { required: true, type: () => String }, createdAt: { required: false, type: () => Date } };
    }
}
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map