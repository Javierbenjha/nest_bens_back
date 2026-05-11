"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
const openapi = require("@nestjs/swagger");
class Size {
    id;
    nombre;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String } };
    }
}
exports.Size = Size;
//# sourceMappingURL=size.entity.js.map