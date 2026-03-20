import { Inject, Injectable } from '@nestjs/common';
import type { SizeRepository } from '../domain/size.repository';
import type { Size } from '../domain/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @Inject('SizeRepository')
    private readonly repo: SizeRepository,
  ) {}

  create(size: Partial<Size>): Promise<Size> {
    return this.repo.create(size as Size);
  }

  findAll(): Promise<Size[]> {
    return this.repo.findAll();
  }

  findOne(id: number): Promise<Size | null> {
    return this.repo.findById(id);
  }

  update(id: number, size: Partial<Size>): Promise<Size> {
    return this.repo.update(id, size);
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
