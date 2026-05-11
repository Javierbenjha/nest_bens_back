"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = exports.AuthToken = void 0;
const openapi = require("@nestjs/swagger");
class AuthToken {
    access_token;
    user;
    constructor(access_token, user) {
        this.access_token = access_token;
        this.user = user;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.AuthToken = AuthToken;
class AuthUser {
    id;
    correo;
    rol;
    cliente;
    constructor(id, correo, rol, cliente) {
        this.id = id;
        this.correo = correo;
        this.rol = rol;
        this.cliente = cliente;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=auth.entity.js.map