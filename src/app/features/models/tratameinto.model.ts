export interface TratamientoPersistencia {
  fechaInicio: any;
  medicamentosId: number;
  mascotasId: number;
}

export interface TratamientoConsulta {
  fechaInicio: Date;
  nombreMedicamento: string;
  nombreMascota: string;
}

export interface TratamientoMascota {
  id: number,
  dosis: string;
  fechaInicio: Date;
  nombreMedicamento: string;
}

export interface ReporteTratamientosDTO {
  fechaInicio: Date;
  descripcion: string;
  dosis: string;
  nombre: string;
}
