import { CouponsService } from '../../application/coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
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
    findOne(codigo: string): Promise<import("../../domain/coupon.entity").Coupon>;
}
