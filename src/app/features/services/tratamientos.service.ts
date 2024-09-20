import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mensaje.model';
import { TratamientoConsulta, TratamientoMascota, TratamientoPersistencia } from '../models/tratameinto.model';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  private API: string = '/api/tratamiento';

  constructor(private httpClient: HttpClient) { }

  public registrarTratamiento(tratamiento: TratamientoPersistencia): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(`${this.API}/registrar`, tratamiento);
  }

  public consultarTratamientos(): Observable<TratamientoConsulta[]> {
    return this.httpClient.get<TratamientoConsulta[]>(`${this.API}/listar`);
  }

  public consultarTratamientosMascota(id: number): Observable<TratamientoMascota[]> {
    return this.httpClient.get<TratamientoMascota[]>(`${this.API}/lstar-tratamientos/${id}`);
  }

  public eliminarTratamiento(id: number): Observable<Mensaje> {
    return this.httpClient.delete<Mensaje>(`${this.API}/${id}`);
  }
}
