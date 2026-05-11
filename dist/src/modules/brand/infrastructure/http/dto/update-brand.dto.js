"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_brand_dto_1 = require("./create-brand.dto");
class UpdateBrandDto extends (0, mapped_types_1.PartialType)(create_brand_dto_1.CreateBrandDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBrandDto = UpdateBrandDto;
//# sourceMappingURL=update-brand.dto.js.map