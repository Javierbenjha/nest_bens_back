import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from '../infrastructure/http/dto/create-coupon.dto';
import type { CouponRepository } from '../domain/coupon.repository';
export declare class CouponsService {
    private readonly prisma;
    private readonly couponRepository;
    constructor(prisma: PrismaService, couponRepository: CouponRepository);
    create(createCouponDto: CreateCouponDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        tipo: import("@prisma/client").$Enums.TipoCupon;
        descripcion: string | null;
        codigo: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        usosMaximos: number | null;
        usosActuales: number;
        fechaExpiracion: Date | null;
        activo: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        tipo: import("@prisma/client").$Enums.TipoCupon;
        descripcion: string | null;
        codigo: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        usosMaximos: number | null;
        usosActuales: number;
        fechaExpiracion: Date | null;
        activo: boolean;
    }[]>;
    findOne(codigo: string): Promise<import("../domain/coupon.entity").Coupon>;
}
