import { PurchasesService } from '../../application/purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    create(createPurchaseDto: CreatePurchaseDto): Promise<import("../../domain/purchase.entity").Purchase>;
    findAll(): Promise<import("../../domain/purchase.entity").Purchase[]>;
    findOne(id: string): Promise<import("../../domain/purchase.entity").Purchase>;
    anular(id: string): Promise<import("../../domain/purchase.entity").Purchase>;
}
