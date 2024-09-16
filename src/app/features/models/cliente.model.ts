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
