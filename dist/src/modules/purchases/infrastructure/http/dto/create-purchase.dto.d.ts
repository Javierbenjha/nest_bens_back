export declare class CreatePurchaseDetailDto {
    productoId?: number;
    articuloId?: number;
    tallaId?: number;
    colorId?: number;
    cantidad: number;
    precio: number;
}
export declare class CreatePurchaseDto {
    tipo: 'PRODUCTO' | 'ARTICULO';
    proveedorId: number;
    detalles: CreatePurchaseDetailDto[];
}
