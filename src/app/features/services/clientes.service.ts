import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ClienteAutoComplete, ClienteConsulta, ClientePersistencia, ClienteUpdate, ReporteClienteDTO } from '../models/cliente.model';
import { Mensaje } from '../models/mensaje.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API: string = '/api/clientes';

  constructor(private httpClient: HttpClient, private apollo: Apollo) { }

  public listarClientes(): Observable<ClienteConsulta[]> {
    return this.httpClient.get<ClienteConsulta[]>(`${this.API}/listar`);
  }

  public registrarCliente(cliente: ClientePersistencia): Observable<Mensaje> {
    return this.httpClient.post<Mensaje>(`${this.API}/registrar`, cliente);
  }

  public eliminarCliente(id: number): Observable<Mensaje> {
    return this.httpClient.delete<Mensaje>(`${this.API}/eliminar/${id}`);
  }

  public editarCliente(cliente: ClienteUpdate): Observable<Mensaje> {
    return this.httpClient.put<Mensaje>(`${this.API}/actualizar`, cliente);
  }

  public consultarAutocompletable(): Observable<ClienteAutoComplete[]> {
    return this.httpClient.get<ClienteAutoComplete[]>(`${this.API}/autocompletable`);
  }

  public generarReporte(idCliente: number): Observable<ReporteClienteDTO> {
    return this.httpClient.get<ReporteClienteDTO>(`${this.API}/reporte/${idCliente}`);
  }

  public graphListarClientes(): Observable<ClienteConsulta[]> {
    const GET_USUARIOS = gql`
      query {
        getAllClientes {
          id
          cedula
          nombres
          apellidos
          direccion
          telefono
        }
      }`;
    return this.apollo.watchQuery({
      query: GET_USUARIOS,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result: any) => result.data.getAllClientes));
  }

  public graphRegistrarCliente(cliente: ClientePersistencia): Observable<Mensaje> {
    const CREATE_CLIENTE = gql`
      mutation($input: ClientePersistencia!) {
        createCliente(input: $input) {
          error
          respuesta
        }
      }`;
    return this.apollo.mutate({
      mutation: CREATE_CLIENTE,
      variables: {
        input: cliente
      }
    }).pipe(map((result: any) => result.data.createCliente));
  }

  public graphEliminarCliente(id: number): Observable<Mensaje> {
    const DELETE_CLIENTE = gql`
      mutation($id: ID!) {
        deleteCliente(id: $id) {
          error
          respuesta
        }
      }`;
    return this.apollo.mutate({
      mutation: DELETE_CLIENTE,
      variables: {
        id: id
      }
    }).pipe(map((result: any) => result.data.deleteCliente));
  }

  public graphEditarCliente(id: number, cliente: ClientePersistencia): Observable<Mensaje> {
    const UPDATE_CLIENTE = gql`
      mutation($id: ID!, $input: ClientePersistencia!) {
        updateCliente(id: $id, input: $input) {
          error
          respuesta
        }
      }`;
    return this.apollo.mutate({
      mutation: UPDATE_CLIENTE,
      variables: {
        id: id,
        input: cliente
      }
    }).pipe(map((result: any) => result.data.updateCliente));
  }
}
