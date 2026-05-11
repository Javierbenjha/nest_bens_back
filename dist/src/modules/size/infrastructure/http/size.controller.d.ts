import { SizeService } from '../../application/size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
export declare class SizeController {
    private readonly sizeService;
    constructor(sizeService: SizeService);
    create(createSizeDto: CreateSizeDto): Promise<import("../../domain/size.entity").Size>;
    findAll(): Promise<import("../../domain/size.entity").Size[]>;
    findOne(id: string): Promise<import("../../domain/size.entity").Size | null>;
    update(id: string, updateSizeDto: UpdateSizeDto): Promise<import("../../domain/size.entity").Size>;
    remove(id: string): Promise<void>;
}
