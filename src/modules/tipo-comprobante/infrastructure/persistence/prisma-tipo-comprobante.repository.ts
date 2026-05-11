import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { TipoComprobanteRepository } from '../../domain/tipo-comprobante.repository';
import type { TipoComprobante } from '../../domain/tipo-comprobante.entity';

@Injectable()
export class PrismaTipoComprobanteRepository implements TipoComprobanteRepository {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<TipoComprobante[]> {
        return this.prisma.tipoComprobante.findMany({ orderBy: { id: 'asc' } }) as unknown as Promise<TipoComprobante[]>;
    }

    findById(id: number): Promise<TipoComprobante | null> {
        return this.prisma.tipoComprobante.findUnique({ where: { id } }) as unknown as Promise<TipoComprobante | null>;
    }

    async create(data: TipoComprobante): Promise<TipoComprobante> {
        const { id, createdAt, updatedAt, ...rest } = data;
        return this.prisma.tipoComprobante.create({ data: rest }) as unknown as TipoComprobante;
    }

    async update(id: number, data: TipoComprobante): Promise<TipoComprobante> {
        const { id: _id, createdAt, updatedAt, ...rest } = data;
        return this.prisma.tipoComprobante.update({ where: { id }, data: rest }) as unknown as TipoComprobante;
    }

    async delete(id: number): Promise<void> {
        await this.prisma.tipoComprobante.delete({ where: { id } });
    }
}
