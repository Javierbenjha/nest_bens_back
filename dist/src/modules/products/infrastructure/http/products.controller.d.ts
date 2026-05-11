import { ProductsService } from '../../application/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly cloudinaryService;
    constructor(productsService: ProductsService, cloudinaryService: CloudinaryService);
    findAll(page?: string, limit?: string, nombre?: string, categoriaId?: string, marcaId?: string, precioMin?: string, precioMax?: string, tallaId?: string, colorId?: string): Promise<{
        data: import("../../domain/product.entity").Product[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
            limit: number;
        };
    }>;
    findOne(id: string): Promise<import("../../domain/product.entity").Product | null>;
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<import("../../domain/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("../../domain/product.entity").Product>;
    remove(id: string): Promise<void>;
}
