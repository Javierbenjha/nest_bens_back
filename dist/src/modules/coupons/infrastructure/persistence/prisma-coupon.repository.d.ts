import { PrismaService } from '../../../../prisma/prisma.service';
import { Coupon } from '../../domain/coupon.entity';
import { CouponRepository } from '../../domain/coupon.repository';
export declare class PrismaCouponRepository implements CouponRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByCode(codigo: string): Promise<Coupon | null>;
    incrementUsage(id: number): Promise<void>;
    findById(id: number): Promise<any>;
}
