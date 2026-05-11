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
exports.CreateItemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateItemDto {
    nombre;
    descripcion;
    cantidad;
    precio;
    unidad;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, cantidad: { required: true, type: () => Number, minimum: 1 }, precio: { required: true, type: () => Number, minimum: 0 }, unidad: { required: true, type: () => String } };
    }
}
exports.CreateItemDto = CreateItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value)),
    __metadata("design:type", String)
], CreateItemDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value)),
    __metadata("design:type", String)
], CreateItemDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateItemDto.prototype, "precio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value)),
    __metadata("design:type", String)
], CreateItemDto.prototype, "unidad", void 0);
//# sourceMappingURL=create-item.dto.js.map