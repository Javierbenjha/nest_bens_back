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
exports.CreateOrderDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OrderItemDto {
    productoId;
    tallaId;
    colorId;
    cantidad;
    precioUnitario;
    omitirDescuento;
    static _OPENAPI_METADATA_FACTORY() {
        return { productoId: { required: true, type: () => Number }, tallaId: { required: false, type: () => Number }, colorId: { required: false, type: () => Number }, cantidad: { required: true, type: () => Number }, precioUnitario: { required: false, type: () => Number, minimum: 1 }, omitirDescuento: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(String(value), 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "productoId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? parseInt(String(value), 10) : value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "tallaId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value !== undefined ? parseInt(String(value), 10) : value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "colorId", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(String(value), 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(String(value))),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OrderItemDto.prototype, "omitirDescuento", void 0);
class CreateOrderDto {
    clienteId;
    usuarioId;
    medioPagoId;
    tipoComprobanteId;
    direccionEnvio;
    observaciones;
    origen;
    cuponCodigo;
    fechaEntrega;
    detalles;
    static _OPENAPI_METADATA_FACTORY() {
        return { clienteId: { required: true, type: () => Number }, usuarioId: { required: false, type: () => Number }, medioPagoId: { required: false, type: () => Number }, tipoComprobanteId: { required: false, type: () => Number }, direccionEnvio: { required: false, type: () => String }, observaciones: { required: false, type: () => String }, origen: { required: false, type: () => Object }, cuponCodigo: { required: false, type: () => String }, fechaEntrega: { required: false, type: () => String }, detalles: { required: true, type: () => [OrderItemDto] } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "clienteId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "medioPagoId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "tipoComprobanteId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "direccionEnvio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['ERP', 'ECOMMERCE']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "origen", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.toUpperCase() : value),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "cuponCodigo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "fechaEntrega", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "detalles", void 0);
//# sourceMappingURL=create-order.dto.js.map