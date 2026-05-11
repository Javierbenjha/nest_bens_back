import { BrandService } from '../../application/brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(createBrandDto: CreateBrandDto): Promise<import("../../domain/brand.entity").Brand>;
    findAll(): Promise<import("../../domain/brand.entity").Brand[]>;
    findOne(id: string): Promise<import("../../domain/brand.entity").Brand | null>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<import("../../domain/brand.entity").Brand>;
    remove(id: string): Promise<void>;
}
