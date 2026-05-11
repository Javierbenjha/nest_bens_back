"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDocumentController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const type_document_service_1 = require("../../application/type-document.service");
const create_type_document_dto_1 = require("./dto/create-type-document.dto");
const update_type_document_dto_1 = require("./dto/update-type-document.dto");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
let TypeDocumentController = class TypeDocumentController {
    typeDocumentService;
    constructor(typeDocumentService) {
        this.typeDocumentService = typeDocumentService;
    }
    create(createTypeDocumentDto) {
        return this.typeDocumentService.create(createTypeDocumentDto);
    }
    findAll() {
        return this.typeDocumentService.findAll();
    }
    findOne(id) {
        return this.typeDocumentService.findOne(+id);
    }
    update(id, updateTypeDocumentDto) {
        return this.typeDocumentService.update(+id, updateTypeDocumentDto);
    }
    remove(id) {
        return this.typeDocumentService.remove(+id);
    }
};
exports.TypeDocumentController = TypeDocumentController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../domain/type-document.entity").TypeDocument }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_document_dto_1.CreateTypeDocumentDto]),
    __metadata("design:returntype", void 0)
], TypeDocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../domain/type-document.entity").TypeDocument] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeDocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/type-document.entity").TypeDocument }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeDocumentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/type-document.entity").TypeDocument }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_document_dto_1.UpdateTypeDocumentDto]),
    __metadata("design:returntype", void 0)
], TypeDocumentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeDocumentController.prototype, "remove", null);
exports.TypeDocumentController = TypeDocumentController = __decorate([
    (0, swagger_1.ApiTags)('Type-document'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Controller)('type-document'),
    __metadata("design:paramtypes", [type_document_service_1.TypeDocumentService])
], TypeDocumentController);
//# sourceMappingURL=type-document.controller.js.map