export declare class OrderItem {
    readonly productoId: number;
    readonly tallaId: number | undefined;
    readonly colorId: number | undefined;
    readonly cantidad: number;
    readonly precioUnitario: number;
    readonly descuento: number;
    readonly subtotal: number;
    constructor(productoId: number, tallaId: number | undefined, colorId: number | undefined, cantidad: number, precioUnitario: number, descuento: number, subtotal: number);
    static create(productoId: number, tallaId: number | undefined, colorId: number | undefined, cantidad: number, precio: number, tipoDescuento: 'PORCENTAJE' | 'VALOR_FIJO' | 'SIN_DESCUENTO', valorDescuentoProducto: number): OrderItem;
}
