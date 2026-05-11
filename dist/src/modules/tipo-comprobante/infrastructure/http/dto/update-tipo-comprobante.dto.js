"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoComprobanteDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tipo_comprobante_dto_1 = require("./create-tipo-comprobante.dto");
class UpdateTipoComprobanteDto extends (0, mapped_types_1.PartialType)(create_tipo_comprobante_dto_1.CreateTipoComprobanteDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTipoComprobanteDto = UpdateTipoComprobanteDto;
//# sourceMappingURL=update-tipo-comprobante.dto.js.map