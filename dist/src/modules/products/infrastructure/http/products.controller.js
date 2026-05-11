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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("../../application/products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../../../cloudinary/cloudinary.service");
const roles_decorator_1 = require("../../../../common/decorators/roles.decorator");
const public_decorator_1 = require("../../../../common/decorators/public.decorator");
let ProductsController = class ProductsController {
    productsService;
    cloudinaryService;
    constructor(productsService, cloudinaryService) {
        this.productsService = productsService;
        this.cloudinaryService = cloudinaryService;
    }
    findAll(page, limit, nombre, categoriaId, marcaId, precioMin, precioMax, tallaId, colorId) {
        return this.productsService.findAll({
            page: page ? +page : 1,
            limit: limit ? +limit : 10,
            nombre,
            categoriaId: categoriaId ? +categoriaId : undefined,
            marcaId: marcaId ? +marcaId : undefined,
            precioMin: precioMin ? +precioMin : undefined,
            precioMax: precioMax ? +precioMax : undefined,
            tallaId: tallaId ? +tallaId : undefined,
            colorId: colorId ? +colorId : undefined,
        });
    }
    findOne(id) {
        return this.productsService.findOne(+id);
    }
    async create(createProductDto, files) {
        let imagesUrls = [];
        if (files && files.length > 0) {
            const results = await Promise.all(files.map((file) => this.cloudinaryService.uploadImage(file)));
            imagesUrls = results.map((res) => res.secure_url);
        }
        else if (createProductDto.imagenes &&
            Array.isArray(createProductDto.imagenes) &&
            createProductDto.imagenes.length > 0) {
            const results = await Promise.all(createProductDto.imagenes.map((img) => typeof img === 'string' && img.startsWith('data:image')
                ? this.cloudinaryService.uploadBase64(img)
                : null));
            imagesUrls = results.filter((res) => res !== null).map((res) => res.secure_url);
        }
        createProductDto.imagenes = imagesUrls;
        return this.productsService.create(createProductDto);
    }
    update(id, updateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(+id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('nombre')),
    __param(3, (0, common_1.Query)('categoriaId')),
    __param(4, (0, common_1.Query)('marcaId')),
    __param(5, (0, common_1.Query)('precioMin')),
    __param(6, (0, common_1.Query)('precioMax')),
    __param(7, (0, common_1.Query)('tallaId')),
    __param(8, (0, common_1.Query)('colorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('imagenes')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
                precio: { type: 'number' },
                categoriaId: { type: 'number' },
                marcaId: { type: 'number' },
                'color[]': { type: 'array', items: { type: 'string' } },
                'tallas[]': { type: 'array', items: { type: 'string' } },
                estado: { type: 'string', enum: ['ACTIVO', 'INACTIVO'] },
                sku: { type: 'string' },
                tieneDescuento: { type: 'boolean' },
                tipoDescuento: { type: 'string', enum: ['PORCENTAJE', 'VALOR_FIJO', 'SIN_DESCUENTO'] },
                valorDescuento: { type: 'number' },
                imagenes: { type: 'array', items: { type: 'string', format: 'binary' } },
            },
        },
    }),
    openapi.ApiResponse({ status: 201, type: require("../../domain/product.entity").Product }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../domain/product.entity").Product }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.ErpAccess)(),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        cloudinary_service_1.CloudinaryService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map