export class Address {
  id?: number;
  clienteId: number;
  alias: string;
  direccion: string;
  distrito: string;
  provincia: string;
  departamento: string;
  referencia?: string | null;
  esPrincipal: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
