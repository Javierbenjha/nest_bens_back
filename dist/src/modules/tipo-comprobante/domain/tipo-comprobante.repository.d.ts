import { TipoComprobante } from './tipo-comprobante.entity';
export interface TipoComprobanteRepository {
    findAll(): Promise<TipoComprobante[]>;
    findById(id: number): Promise<TipoComprobante | null>;
    create(data: TipoComprobante): Promise<TipoComprobante>;
    update(id: number, data: TipoComprobante): Promise<TipoComprobante>;
    delete(id: number): Promise<void>;
}
