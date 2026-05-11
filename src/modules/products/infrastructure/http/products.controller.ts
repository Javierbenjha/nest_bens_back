import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { ProductsService } from '../../application/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { ErpAccess } from '../../../../common/decorators/roles.decorator';
import { Public } from '../../../../common/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Public()
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('nombre') nombre?: string,
    @Query('categoriaId') categoriaId?: string,
    @Query('marcaId') marcaId?: string,
    @Query('precioMin') precioMin?: string,
    @Query('precioMax') precioMax?: string,
    @Query('tallaId') tallaId?: string,
    @Query('colorId') colorId?: string,
  ) {
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

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiBearerAuth()
  @ErpAccess()
  @Post()
  @UseInterceptors(FilesInterceptor('imagenes'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let imagesUrls: string[] = [];

    if (files && files.length > 0) {
      const results = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImage(file)),
      );
      imagesUrls = results.map((res) => res.secure_url);
    } else if (
      createProductDto.imagenes &&
      Array.isArray(createProductDto.imagenes) &&
      createProductDto.imagenes.length > 0
    ) {
      const results = await Promise.all(
        createProductDto.imagenes.map((img) =>
          typeof img === 'string' && img.startsWith('data:image')
            ? this.cloudinaryService.uploadBase64(img)
            : null,
        ),
      );
      imagesUrls = results.filter((res) => res !== null).map((res) => res!.secure_url);
    }

    createProductDto.imagenes = imagesUrls;
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @ErpAccess()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiBearerAuth()
  @ErpAccess()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
