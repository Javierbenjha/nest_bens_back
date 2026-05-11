"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
class Product {
    id;
    nombre;
    descripcion;
    precio;
    categoriaId;
    marcaId;
    color;
    tallas;
    imagenes;
    sku;
    tipoDescuento;
    valorDescuento;
    createdAt;
    categoria;
    marca;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String, nullable: true }, precio: { required: true, type: () => Number }, categoriaId: { required: true, type: () => Number }, marcaId: { required: true, type: () => Number }, color: { required: false, type: () => [String] }, tallas: { required: false, type: () => [String] }, imagenes: { required: false, type: () => [String] }, sku: { required: false, type: () => String }, tipoDescuento: { required: false, type: () => Object }, valorDescuento: { required: false, type: () => Number }, createdAt: { required: false, type: () => Date }, categoria: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String } }) }, marca: { required: false, type: () => ({ id: { required: true, type: () => Number }, nombre: { required: true, type: () => String } }) } };
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map