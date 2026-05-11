"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const openapi = require("@nestjs/swagger");
class Recipe {
    id;
    productoId;
    articuloId;
    cantidad;
    producto;
    articulo;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, productoId: { required: true, type: () => Number }, articuloId: { required: true, type: () => Number }, cantidad: { required: true, type: () => Number }, producto: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String } }) }, articulo: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, unidad: { required: true, type: () => String } }) }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.entity.js.map