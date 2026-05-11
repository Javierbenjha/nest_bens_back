import { PrismaService } from 'src/prisma/prisma.service';
import type { TipoComprobanteRepository } from '../../domain/tipo-comprobante.repository';
import type { TipoComprobante } from '../../domain/tipo-comprobante.entity';
export declare class PrismaTipoComprobanteRepository implements TipoComprobanteRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<TipoComprobante[]>;
    findById(id: number): Promise<TipoComprobante | null>;
    create(data: TipoComprobante): Promise<TipoComprobante>;
    update(id: number, data: TipoComprobante): Promise<TipoComprobante>;
    delete(id: number): Promise<void>;
}
