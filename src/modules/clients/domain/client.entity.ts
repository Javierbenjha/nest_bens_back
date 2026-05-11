export class Client {
  id?: number;
  tipoDocumentoId?: number;
  documento: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string | null;
  createdAt?: Date;
}
