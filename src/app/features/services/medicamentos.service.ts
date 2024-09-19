import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicamentoConsulta, MedicamentoPersistencia, MedicamentoUpdate } from '../models/medicamento.model';
import { Mensaje } from '../models/mensaje.model';


@Injectable({
    providedIn: 'root'
  })

export class MedicamentosService {
    private API: string = '/api/medicamento';

    constructor(private httpClient: HttpClient) { }

    public listarMedicamento(): Observable<MedicamentoConsulta[]> {
        return this.httpClient.get<MedicamentoConsulta[]>(`${this.API}/listar`);
    }
    public elimianrMaedicamento(idMedicamento: number): Observable<Mensaje> {
        return this.httpClient.delete<Mensaje>(`${this.API}/${idMedicamento}`);
    }

    public registrarMedicamento(medicamento: MedicamentoPersistencia): Observable<Mensaje> {
        return this.httpClient.post<Mensaje>(`${this.API}/registrar`, medicamento);
    }

    public editarMedicamento(medicamento: MedicamentoUpdate): Observable<Mensaje> {
        return this.httpClient.put<Mensaje>(`${this.API}/actualizar`, medicamento);
    }
  }