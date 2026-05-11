declare class OrderItemDto {
    productoId: number;
    tallaId?: number;
    colorId?: number;
    cantidad: number;
    precioUnitario?: number;
    omitirDescuento?: boolean;
}
export declare class CreateOrderDto {
    clienteId: number;
    usuarioId?: number;
    medioPagoId?: number;
    tipoComprobanteId?: number;
    direccionEnvio?: string;
    observaciones?: string;
    origen?: 'ERP' | 'ECOMMERCE';
    cuponCodigo?: string;
    fechaEntrega?: string;
    detalles: OrderItemDto[];
}
export {};
