"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
class User {
    id;
    correo;
    rol;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, correo: { required: true, type: () => String }, rol: { required: false, type: () => String }, createdAt: { required: false, type: () => Date } };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map