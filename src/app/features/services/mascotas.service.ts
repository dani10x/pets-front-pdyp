import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MascotaConsulta, MascotaConsultaDTO, MascotaEntity, MascotaPersistencia, MascotaUpdate } from '../models/mascota.model';
import { Mensaje } from '../models/mensaje.model';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private API: string = '/api/mascotas';

  constructor(private httpClient: HttpClient, private apollo: Apollo) { }

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

  public listarMascotasPropietario(): Observable<MascotaConsultaDTO[]> {
    return this.httpClient.get<MascotaConsultaDTO[]>(`${this.API}/listar-mascotas`);
  }

  public graphListarMascotas(): Observable<MascotaEntity[]> {
    const GET_MASCOTAS = gql`
      query {
        getAllMascotas {
          id
          nombre
          raza
          peso
          fechaNacimiento
          idCliente
          ClienteEntity {
            nombres
            apellidos
          }
        }
      }`;
    return this.apollo.watchQuery({
      query: GET_MASCOTAS,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result: any) => result.data.getAllMascotas));
  }

  public graphElimianrMascota(idMascota: number): Observable<Mensaje> {
    const DELETE_MASCOTA = gql`
      mutation($id: ID!) {
        deleteMascota(id: $id) {
          error
          respuesta
        }
      }`;

    return this.apollo.mutate({
      mutation: DELETE_MASCOTA,
      variables: {
        id: idMascota
      }
    }).pipe(map((result: any) => result.data.deleteMascota));
  }

  public graphActualizarMascota(mascota: MascotaUpdate): Observable<Mensaje> {
    const UPDATE_MASCOTA = gql`
      mutation($input: MascotaUpdate!) {
        updateMascota(input: $input) {
          error
          respuesta
        }
      }`;

    return this.apollo.mutate({
      mutation: UPDATE_MASCOTA,
      variables: {
        input: mascota
      }
    }).pipe(map((result: any) => result.data.updateMascota));
  }

  public grahpAgregarMascota(mascota: MascotaPersistencia): Observable<Mensaje> {
    const CREATE_MASCOTA = gql`
      mutation($input: MascotaPersistencia!) {
        createMascota(input: $input) {
          error
          respuesta
        }
      }`;
    return this.apollo.mutate({
      mutation: CREATE_MASCOTA,
      variables: {
        input: mascota
      }
    }).pipe(map((result: any) => result.data.createMascota));
  }
}
