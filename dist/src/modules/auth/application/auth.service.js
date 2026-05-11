"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    authRepo;
    jwtService;
    constructor(authRepo, jwtService) {
        this.authRepo = authRepo;
        this.jwtService = jwtService;
    }
    async validateUser(correo, pass) {
        const user = await this.authRepo.findByEmail(correo);
        if (!user)
            return null;
        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid)
            return null;
        const { password: _, ...result } = user;
        return result;
    }
    async login(user) {
        const payload = { correo: user.correo, sub: user.id, rol: user.rol, clienteId: user.cliente?.id ?? null };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
    async register(dto) {
        const existing = await this.authRepo.findByEmail(dto.correo);
        if (existing)
            throw new common_1.ConflictException('El correo ya está registrado');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = await this.authRepo.createUserWithClient({
            correo: dto.correo,
            password: hashedPassword,
            nombre: dto.nombre,
            apellido: dto.apellido,
            telefono: dto.telefono ?? null,
        });
        const payload = { correo: newUser.correo, sub: newUser.id, rol: newUser.rol, clienteId: newUser.cliente?.id ?? null };
        return {
            access_token: this.jwtService.sign(payload),
            user: newUser,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AuthRepository')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map