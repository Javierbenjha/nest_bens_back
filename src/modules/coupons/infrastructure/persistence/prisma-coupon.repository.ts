import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Coupon } from '../../domain/coupon.entity';
import { CouponRepository } from '../../domain/coupon.repository';

@Injectable()
export class PrismaCouponRepository implements CouponRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCode(codigo: string): Promise<Coupon | null> {
    const rawCoupon = await this.prisma.cupon.findUnique({
      where: { codigo },
    });

    if (!rawCoupon) return null;

    return new Coupon(
      rawCoupon.id,
      rawCoupon.codigo,
      Number(rawCoupon.valor),
      rawCoupon.tipo,
      rawCoupon.usosMaximos,
      rawCoupon.usosActuales,
      rawCoupon.activo,
      rawCoupon.fechaExpiracion,
    );
  }

  async incrementUsage(id: number): Promise<void> {
    await this.prisma.cupon.update({
      where: { id },
      data: { usosActuales: { increment: 1 } },
    });
  }

  async findById(id: number): Promise<any> {
    return this.prisma.cupon.findUnique({
      where: { id },
    });
  }
}
