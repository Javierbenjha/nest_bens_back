import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from '../infrastructure/http/dto/create-coupon.dto';
import { PrismaCouponRepository } from '../infrastructure/persistence/prisma-coupon.repository';

@Injectable()
export class CouponsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponRepository: PrismaCouponRepository,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    return this.prisma.cupon.create({
      data: {
        codigo: createCouponDto.codigo,
        descripcion: createCouponDto.descripcion,
        valor: createCouponDto.valor,
        tipo: createCouponDto.tipo,
        usosMaximos: createCouponDto.usosMaximos,
        fechaExpiracion: createCouponDto.fechaExpiracion ? new Date(createCouponDto.fechaExpiracion) : null,
        activo: createCouponDto.activo ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.cupon.findMany();
  }

  async findOne(codigo: string) {
    const coupon = await this.couponRepository.findByCode(codigo);
    if (!coupon) {
      throw new NotFoundException(`Cupón con código ${codigo} no encontrado`);
    }
    return coupon;
  }
}
