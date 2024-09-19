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
