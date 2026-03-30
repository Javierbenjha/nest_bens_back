import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from '../../application/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('imagenes'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    let imagesUrls: string[] = [];

    // Prioridad 1: Archivos capturados por Multer
    if (files && files.length > 0) {
      const results = await Promise.all(
        files.map((file) => this.cloudinaryService.uploadImage(file)),
      );
      imagesUrls = results.map((res) => res.secure_url);
    }
    // Prioridad 2: Sabores Base64 en el cuerpo del JSON
    else if (
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

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
