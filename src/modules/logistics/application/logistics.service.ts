import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { LogisticRepository } from '../domain/logistic.repository';
import type { DeliverData, Logistic } from '../domain/logistic.entity';

@Injectable()
export class LogisticsService {
  constructor(
    @Inject('LogisticRepository')
    private readonly repo: LogisticRepository,
  ) {}

  findPending(): Promise<Logistic[]> {
    return this.repo.findPending();
  }

  findAll(): Promise<Logistic[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Logistic> {
    const logistic = await this.repo.findById(id);
    if (!logistic) throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    return logistic;
  }

  async dispatch(id: number): Promise<Logistic> {
    const logistic = await this.repo.findById(id);
    if (!logistic) throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    if (logistic.estado !== 'PAGADO') {
      throw new BadRequestException(
        `Solo se pueden despachar pedidos en estado PAGADO. Estado actual: ${logistic.estado}`,
      );
    }
    return this.repo.dispatch(id);
  }

  async deliver(id: number, data: DeliverData): Promise<Logistic> {
    const logistic = await this.repo.findById(id);
    if (!logistic) throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    if (logistic.estado !== 'PAGADO' && logistic.estado !== 'EN_CAMINO') {
      throw new BadRequestException(
        `Solo se pueden entregar pedidos en estado PAGADO o EN_CAMINO. Estado actual: ${logistic.estado}`,
      );
    }
    return this.repo.deliver(id, data);
  }
}
