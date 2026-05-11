import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProductionOrderRepository } from '../domain/production-order.repository';
import type { ProductionOrder } from '../domain/production-order.entity';

@Injectable()
export class ProductionService {
  constructor(
    @Inject('ProductionOrderRepository')
    private readonly repo: ProductionOrderRepository,
  ) {}

  create(data: ProductionOrder): Promise<ProductionOrder> {
    return this.repo.create(data);
  }

  findAll(): Promise<ProductionOrder[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<ProductionOrder> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(`Orden de producción con ID ${id} no encontrada`);
    return order;
  }

  async start(id: number): Promise<ProductionOrder> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(`Orden de producción con ID ${id} no encontrada`);
    if (order.estado !== 'PENDIENTE') {
      throw new BadRequestException(
        `Solo se pueden iniciar órdenes en estado PENDIENTE. Estado actual: ${order.estado}`,
      );
    }
    return this.repo.start(id);
  }

  async complete(id: number, cantidadProducida: number): Promise<ProductionOrder> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(`Orden de producción con ID ${id} no encontrada`);
    if (order.estado !== 'EN_PROCESO') {
      throw new BadRequestException(
        `Solo se pueden completar órdenes en estado EN_PROCESO. Estado actual: ${order.estado}`,
      );
    }
    if (cantidadProducida <= 0) {
      throw new BadRequestException('La cantidad producida debe ser mayor a 0');
    }
    return this.repo.complete(id, cantidadProducida);
  }

  async cancel(id: number): Promise<ProductionOrder> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(`Orden de producción con ID ${id} no encontrada`);
    if (order.estado === 'COMPLETADO') {
      throw new BadRequestException('No se puede cancelar una orden ya completada');
    }
    if (order.estado === 'CANCELADO') {
      throw new BadRequestException('La orden ya está cancelada');
    }
    return this.repo.cancel(id);
  }
}
