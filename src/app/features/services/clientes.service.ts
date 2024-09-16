import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteConsulta, ClientePersistencia } from '../models/cliente.model';
import { Mensaje } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API: string = '/api/clientes';

  constructor(private httpClient: HttpClient) { }

  public listarClientes(): Observable<ClienteConsulta[]> {
    return this.httpClient.get<ClienteConsulta[]>(`${this.API}/listar`);
  }

  public registrarCliente(cliente: ClientePersistencia): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(`${this.API}/registrar`, cliente);
  }


}
