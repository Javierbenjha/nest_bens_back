import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { PaymentMethodRepository } from '../domain/payment-method.repository';
import type { PaymentMethod } from '../domain/payment-method.entity';
import { CreatePaymentMethodDto } from '../infrastructure/http/dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../infrastructure/http/dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @Inject('PaymentMethodRepository')
    private readonly repo: PaymentMethodRepository,
  ) {}

  create(dto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    return this.repo.create(dto as PaymentMethod);
  }

  findAll(): Promise<PaymentMethod[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<PaymentMethod> {
    const found = await this.repo.findById(id);
    if (!found) throw new NotFoundException(`Medio de pago #${id} no encontrado`);
    return found;
  }

  async update(id: number, dto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    await this.findOne(id);
    return this.repo.update(id, dto as PaymentMethod);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
