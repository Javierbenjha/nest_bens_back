import type { PurchaseRepository } from '../domain/purchase.repository';
import type { Purchase } from '../domain/purchase.entity';
import { CreatePurchaseDto } from '../infrastructure/http/dto/create-purchase.dto';
export declare class PurchasesService {
    private readonly repo;
    constructor(repo: PurchaseRepository);
    create(dto: CreatePurchaseDto): Promise<Purchase>;
    findAll(): Promise<Purchase[]>;
    findOne(id: number): Promise<Purchase>;
    anular(id: number): Promise<Purchase>;
    remove(id: number): Promise<void>;
}
