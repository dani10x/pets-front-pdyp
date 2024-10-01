import { ClienteConsulta } from "./cliente.model";
import { ReporteTratamientosDTO } from "./tratameinto.model";

export interface MascotaConsulta {
    id: number;
    nombre: string;
    raza: string;
    peso: number;
    fechaNacimiento: Date;
    idCliente: number;
}

export interface MascotaPersistencia {
  nombre: string;
  raza: string;
  peso: string;
  fechaNacimiento: any;
  idCliente: number;
}

export interface MascotaUpdate extends MascotaPersistencia {
  id: number;
}

export interface MascotaConsultaDTO {
  id: number;
  nombre: string;
  raza: string;
  peso: number;
  fechaNacimiento: Date;
  idCliente: number;
  cliente: string;
}

export interface ReporteMascotasDTO {
  nombre: string;
  raza: string;
  peso: number;
  fechaNacimiento: Date;
  tratamientos: ReporteTratamientosDTO[];
}

export interface MascotaEntity {
  id: number;
  nombre: string;
  raza: string;
  peso: number;
  fechaNacimiento: Date;
  idCliente: number;
  ClienteEntity: ClienteConsulta;
}
