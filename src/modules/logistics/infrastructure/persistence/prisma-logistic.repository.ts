import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogisticRepository } from '../../domain/logistic.repository';
import { DeliverData, Logistic } from '../../domain/logistic.entity';

const PEDIDO_INCLUDE = {
  cliente: true,
  medioPago: true,
  detalles: {
    include: { producto: true, talla: true, color: true },
  },
};

@Injectable()
export class PrismaLogisticRepository implements LogisticRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPending(): Promise<Logistic[]> {
    return this.prisma.pedido.findMany({
      where: { estado: 'PAGADO' },
      include: PEDIDO_INCLUDE,
      orderBy: { createdAt: 'asc' },
    }) as unknown as Logistic[];
  }

  async findAll(): Promise<Logistic[]> {
    return this.prisma.pedido.findMany({
      where: { estado: { in: ['EN_CAMINO', 'ENTREGADO'] } },
      include: PEDIDO_INCLUDE,
      orderBy: { updatedAt: 'desc' },
    }) as unknown as Logistic[];
  }

  async findById(id: number): Promise<Logistic | null> {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: PEDIDO_INCLUDE,
    }) as unknown as Logistic | null;
  }

  async dispatch(id: number): Promise<Logistic> {
    return this.prisma.pedido.update({
      where: { id },
      data: { estado: 'EN_CAMINO' },
      include: PEDIDO_INCLUDE,
    }) as unknown as Logistic;
  }

  async deliver(id: number, data: DeliverData): Promise<Logistic> {
    return this.prisma.pedido.update({
      where: { id },
      data: {
        estado: 'ENTREGADO',
        fechaEntrega: data.fechaEntrega ? new Date(data.fechaEntrega) : new Date(),
        ...(data.direccionEnvio && { direccionEnvio: data.direccionEnvio }),
        ...(data.observaciones && { observaciones: data.observaciones }),
      },
      include: PEDIDO_INCLUDE,
    }) as unknown as Logistic;
  }
}
