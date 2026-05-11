"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypeDocumentDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_type_document_dto_1 = require("./create-type-document.dto");
class UpdateTypeDocumentDto extends (0, mapped_types_1.PartialType)(create_type_document_dto_1.CreateTypeDocumentDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTypeDocumentDto = UpdateTypeDocumentDto;
//# sourceMappingURL=update-type-document.dto.js.map