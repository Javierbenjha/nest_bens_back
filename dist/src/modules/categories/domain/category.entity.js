"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
class Category {
    id;
    nombre;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, nombre: { required: true, type: () => String } };
    }
}
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map