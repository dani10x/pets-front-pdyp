export interface MedicamentoConsulta {
    id: number;
    nombre: string;
    descripcion: string;
    dosis: string;
}

export interface MedicamentoPersistencia {
    nombre: string;
    descripcion: string;
    dosis: string
  }
  
  export interface MedicamentoUpdate extends MedicamentoPersistencia {
    id: number;
  }