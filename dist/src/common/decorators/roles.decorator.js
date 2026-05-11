"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcommerceAccess = exports.ErpAccess = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
const ErpAccess = () => (0, exports.Roles)('ADMINISTRADOR', 'VENDEDOR');
exports.ErpAccess = ErpAccess;
const EcommerceAccess = () => (0, exports.Roles)('CLIENTE');
exports.EcommerceAccess = EcommerceAccess;
//# sourceMappingURL=roles.decorator.js.map