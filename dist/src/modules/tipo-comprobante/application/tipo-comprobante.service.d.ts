import type { TipoComprobanteRepository } from '../domain/tipo-comprobante.repository';
import type { TipoComprobante } from '../domain/tipo-comprobante.entity';
import { CreateTipoComprobanteDto } from '../infrastructure/http/dto/create-tipo-comprobante.dto';
import { UpdateTipoComprobanteDto } from '../infrastructure/http/dto/update-tipo-comprobante.dto';
export declare class TipoComprobanteService {
    private readonly repo;
    constructor(repo: TipoComprobanteRepository);
    findAll(): Promise<TipoComprobante[]>;
    create(dto: CreateTipoComprobanteDto): Promise<TipoComprobante>;
    findOne(id: number): Promise<TipoComprobante>;
    update(id: number, dto: UpdateTipoComprobanteDto): Promise<TipoComprobante>;
    remove(id: number): Promise<void>;
}
