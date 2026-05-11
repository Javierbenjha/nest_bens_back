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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseDto = exports.CreatePurchaseDetailDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePurchaseDetailDto {
    productoId;
    articuloId;
    tallaId;
    colorId;
    cantidad;
    precio;
    static _OPENAPI_METADATA_FACTORY() {
        return { productoId: { required: false, type: () => Number }, articuloId: { required: false, type: () => Number }, tallaId: { required: false, type: () => Number }, colorId: { required: false, type: () => Number }, cantidad: { required: true, type: () => Number, minimum: 1 }, precio: { required: true, type: () => Number, minimum: 1 } };
    }
}
exports.CreatePurchaseDetailDto = CreatePurchaseDetailDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "productoId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "articuloId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "tallaId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "colorId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(String(value), 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(String(value))),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePurchaseDetailDto.prototype, "precio", void 0);
class CreatePurchaseDto {
    tipo;
    proveedorId;
    detalles;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: true, type: () => Object }, proveedorId: { required: true, type: () => Number }, detalles: { required: true, type: () => [require("./create-purchase.dto").CreatePurchaseDetailDto] } };
    }
}
exports.CreatePurchaseDto = CreatePurchaseDto;
__decorate([
    (0, class_validator_1.IsEnum)(['PRODUCTO', 'ARTICULO']),
    __metadata("design:type", String)
], CreatePurchaseDto.prototype, "tipo", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(String(value), 10)),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePurchaseDto.prototype, "proveedorId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePurchaseDetailDto),
    __metadata("design:type", Array)
], CreatePurchaseDto.prototype, "detalles", void 0);
//# sourceMappingURL=create-purchase.dto.js.map