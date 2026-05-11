import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { InventoryRepository } from '../domain/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('InventoryRepository')
    private readonly repo: InventoryRepository,
  ) {}

  async create(data: { productoId: number; colorId: number; tallaId: number; stock: number; stockMinimo: number; precio: number }) {
    try {
      return await this.repo.create(data);
    } catch {
      throw new ConflictException('Ya existe un registro de inventario para esa combinación producto/color/talla');
    }
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const inv = await this.repo.findById(id);
    if (!inv) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inv;
  }

  findByProduct(productoId: number) {
    return this.repo.findByProduct(productoId);
  }

  findLowStock() {
    return this.repo.findLowStock();
  }

  async update(id: number, stock: number, stockMinimo?: number, precio?: number) {
    const inv = await this.findOne(id);
    if (stock < 0) throw new BadRequestException('El stock no puede ser negativo');
    const updated = await this.repo.update(id, stock, stockMinimo, precio);
    if (stock !== inv.stock) {
      await this.repo.logMovement({
        inventarioId: id,
        tipo: stock > inv.stock ? 'INGRESO' : 'EGRESO',
        cantidad: Math.abs(stock - inv.stock),
        stockAntes: inv.stock,
        stockDespues: stock,
        referencia: 'AJUSTE-MANUAL',
      });
    }
    return updated;
  }

  getMovements(inventarioId: number) {
    return this.repo.getMovements(inventarioId);
  }
}
