"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = exports.PurchaseDetail = void 0;
const openapi = require("@nestjs/swagger");
class PurchaseDetail {
    id;
    productoId;
    articuloId;
    tallaId;
    colorId;
    cantidad;
    precio;
    subtotal;
    producto;
    articulo;
    talla;
    color;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, productoId: { required: false, type: () => Number }, articuloId: { required: false, type: () => Number }, tallaId: { required: false, type: () => Number }, colorId: { required: false, type: () => Number }, cantidad: { required: true, type: () => Number }, precio: { required: true, type: () => Number }, subtotal: { required: false, type: () => Number }, producto: { required: false, type: () => Object }, articulo: { required: false, type: () => Object }, talla: { required: false, type: () => Object }, color: { required: false, type: () => Object } };
    }
}
exports.PurchaseDetail = PurchaseDetail;
class Purchase {
    id;
    tipo;
    estado;
    proveedorId;
    total;
    detalles;
    proveedor;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, tipo: { required: true, type: () => Object }, estado: { required: false, type: () => Object }, proveedorId: { required: true, type: () => Number }, total: { required: false, type: () => Number }, detalles: { required: true, type: () => [require("./purchase.entity").PurchaseDetail] }, proveedor: { required: false, type: () => Object }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } };
    }
}
exports.Purchase = Purchase;
//# sourceMappingURL=purchase.entity.js.map