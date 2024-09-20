import { ReporteMascotasDTO } from "./mascota.model";

export interface ClienteConsulta {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
}

export interface ClientePersistencia {
  cedula: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
}

export interface ClienteUpdate extends ClientePersistencia {
  id: number;
}

export interface ClienteAutoComplete {
  id: number;
  nombre: string;
}

export interface ReporteClienteDTO {
  cedula: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  mascotas: ReporteMascotasDTO[];
}
