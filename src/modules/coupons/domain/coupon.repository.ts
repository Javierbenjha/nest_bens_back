import { Coupon } from './coupon.entity';

export interface CouponRepository {
  findByCode(code: string): Promise<Coupon | null>;
  incrementUsage(id: number): Promise<void>;
  findById(id: number): Promise<any>;
}
