export declare class Logistic {
    id: number;
    estado: string;
    fechaEntrega?: Date | null;
    direccionEnvio?: string | null;
    observaciones?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface DeliverData {
    fechaEntrega?: string;
    direccionEnvio?: string;
    observaciones?: string;
}
