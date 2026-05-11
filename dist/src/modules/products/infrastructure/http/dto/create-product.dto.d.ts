export declare class CreateProductDto {
    nombre: string;
    descripcion?: string;
    precio: number;
    categoriaId: number;
    marcaId: number;
    color?: string[];
    tallas?: string[];
    estado?: 'ACTIVO' | 'INACTIVO';
    sku?: string;
    tipoDescuento?: 'PORCENTAJE' | 'VALOR_FIJO' | 'SIN_DESCUENTO';
    valorDescuento?: number;
    imagenes?: any[];
}
