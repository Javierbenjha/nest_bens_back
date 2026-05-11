"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const openapi = require("@nestjs/swagger");
class Brand {
    id;
    nombre;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String } };
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand.entity.js.map