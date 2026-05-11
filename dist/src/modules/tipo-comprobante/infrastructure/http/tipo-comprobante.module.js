"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComprobanteModule = void 0;
const common_1 = require("@nestjs/common");
const tipo_comprobante_service_1 = require("../../application/tipo-comprobante.service");
const tipo_comprobante_controller_1 = require("./tipo-comprobante.controller");
const prisma_tipo_comprobante_repository_1 = require("../persistence/prisma-tipo-comprobante.repository");
const prisma_module_1 = require("../../../../prisma/prisma.module");
let TipoComprobanteModule = class TipoComprobanteModule {
};
exports.TipoComprobanteModule = TipoComprobanteModule;
exports.TipoComprobanteModule = TipoComprobanteModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [tipo_comprobante_controller_1.TipoComprobanteController],
        providers: [
            tipo_comprobante_service_1.TipoComprobanteService,
            {
                provide: 'TipoComprobanteRepository',
                useClass: prisma_tipo_comprobante_repository_1.PrismaTipoComprobanteRepository,
            },
        ],
    })
], TipoComprobanteModule);
//# sourceMappingURL=tipo-comprobante.module.js.map