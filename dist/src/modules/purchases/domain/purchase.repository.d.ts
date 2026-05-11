import { Purchase } from './purchase.entity';
export interface PurchaseRepository {
    create(purchase: Purchase): Promise<Purchase>;
    findAll(): Promise<Purchase[]>;
    findById(id: number): Promise<Purchase | null>;
    anular(id: number): Promise<Purchase>;
    delete(id: number): Promise<void>;
}
