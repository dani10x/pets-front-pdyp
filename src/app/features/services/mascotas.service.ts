import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MascotaConsulta, MascotaPersistencia, MascotaUpdate } from '../models/mascota.model';
import { Mensaje } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private API: string = '/api/mascotas';

  constructor(private httpClient: HttpClient) { }

  public listarMascotas(): Observable<MascotaConsulta[]> {
    return this.httpClient.get<MascotaConsulta[]>(`${this.API}/listar`);
  }

  public elimianrMascota(idMascota: number): Observable<Mensaje> {
    return this.httpClient.delete<Mensaje>(`${this.API}/${idMascota}`);
  }

  public agregarMascota(mascota: MascotaPersistencia): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(`${this.API}/registrar`, mascota);
  }

  public actualizarMascota(mascota: MascotaUpdate): Observable<Mensaje> {
    return this.httpClient.put<Mensaje>(`${this.API}/actualizar`, mascota);
  }
}
