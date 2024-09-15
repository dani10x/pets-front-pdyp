import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteConsulta } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API: string = '/api/clientes';

  constructor(private httpClient: HttpClient) { }

  public listarClientes(): Observable<ClienteConsulta[]> {
    return this.httpClient.get<any>(`${this.API}/listar`);
  }


}
