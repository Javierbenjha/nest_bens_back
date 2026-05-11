import { TipoComprobanteService } from '../../application/tipo-comprobante.service';
import { CreateTipoComprobanteDto } from './dto/create-tipo-comprobante.dto';
import { UpdateTipoComprobanteDto } from './dto/update-tipo-comprobante.dto';
export declare class TipoComprobanteController {
    private readonly service;
    constructor(service: TipoComprobanteService);
    findAll(): Promise<import("../../domain/tipo-comprobante.entity").TipoComprobante[]>;
    create(dto: CreateTipoComprobanteDto): Promise<import("../../domain/tipo-comprobante.entity").TipoComprobante>;
    update(id: string, dto: UpdateTipoComprobanteDto): Promise<import("../../domain/tipo-comprobante.entity").TipoComprobante>;
    remove(id: string): Promise<void>;
}
