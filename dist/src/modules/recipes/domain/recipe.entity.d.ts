export declare class Recipe {
    id?: number;
    productoId: number;
    articuloId: number;
    cantidad: number;
    producto?: {
        id: number;
        nombre: string;
    };
    articulo?: {
        id: number;
        nombre: string;
        unidad: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
