"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const openapi = require("@nestjs/swagger");
class Inventory {
    id;
    productoId;
    colorId;
    tallaId;
    stock;
    stockMinimo;
    precio;
    producto;
    color;
    talla;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, productoId: { required: true, type: () => Number }, colorId: { required: true, type: () => Number }, tallaId: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, stockMinimo: { required: true, type: () => Number }, precio: { required: true, type: () => Number }, producto: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, precio: { required: true, type: () => Number } }) }, color: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String } }) }, talla: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String } }) }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.entity.js.map