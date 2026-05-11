export declare class PurchaseDetail {
    id?: number;
    productoId?: number;
    articuloId?: number;
    tallaId?: number;
    colorId?: number;
    cantidad: number;
    precio: number;
    subtotal?: number;
    producto?: any;
    articulo?: any;
    talla?: any;
    color?: any;
}
export declare class Purchase {
    id?: number;
    tipo: 'PRODUCTO' | 'ARTICULO';
    estado?: 'VIGENTE' | 'ANULADO';
    proveedorId: number;
    total?: number;
    detalles: PurchaseDetail[];
    proveedor?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
