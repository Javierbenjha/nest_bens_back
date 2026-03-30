import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from '../../domain/payment-method.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentMethod } from '../../domain/payment-method.entity';

@Injectable()
export class PrismaPaymentMethodRepository implements PaymentMethodRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        const { id, createdAt, updatedAt, ...data } = paymentMethod;
        return this.prisma.medioPago.create({ data }) as unknown as PaymentMethod;
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.prisma.medioPago.findMany() as unknown as PaymentMethod[];
    }

    async findById(id: number): Promise<PaymentMethod | null> {
        return this.prisma.medioPago.findUnique({ where: { id } }) as unknown as PaymentMethod | null;
    }

    async update(id: number, paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        const { id: _id, createdAt, updatedAt, ...data } = paymentMethod;
        return this.prisma.medioPago.update({ where: { id }, data }) as unknown as PaymentMethod;
    }

    async delete(id: number): Promise<void> {
        await this.prisma.medioPago.delete({ where: { id } });
    }
}
