import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { SaleRepository } from '../domain/sale.repository';
import type { Sale } from '../domain/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SaleRepository')
    private readonly repo: SaleRepository,
  ) {}

  async createFromOrder(pedidoId: number): Promise<Sale> {
    const pedido = await this.repo.findPedidoById(pedidoId);
    if (!pedido) throw new NotFoundException(`Pedido con ID ${pedidoId} no encontrado`);

    const existing = await this.repo.findByPedidoId(pedidoId);
    if (existing) throw new ConflictException(`Ya existe una venta para el pedido ${pedidoId}`);

    if (pedido.estado !== 'PAGADO') {
      throw new ConflictException(
        `Solo se puede registrar venta para pedidos PAGADO. Estado actual: ${pedido.estado}`,
      );
    }

    return this.repo.save(pedidoId);
  }

  findAll(): Promise<Sale[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.repo.findById(id);
    if (!sale) throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    return sale;
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
