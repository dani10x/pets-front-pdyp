import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,Observable } from 'rxjs';
import { MedicamentoConsulta, MedicamentoPersistencia, MedicamentoUpdate } from '../models/medicamento.model';
import { Mensaje } from '../models/mensaje.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
    providedIn: 'root'
  })

export class MedicamentosService {
    private API: string = '/api/medicamento';

    constructor(private httpClient: HttpClient, private apollo: Apollo) { }

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

    public graphListarMedicamentos() : Observable<MedicamentoConsulta[]>{
        const GET_MEDICAMETOS = gql`
            query {
                getAllMedicamentos{
                    id
                    descripcion
                    nombre
                    dosis
                }
            }`;
        return this.apollo.watchQuery({
            query: GET_MEDICAMETOS,
            fetchPolicy: 'network-only'
          }).valueChanges.pipe(map((result: any) => result.data.getAllMedicamentos));
        }

    public graphRegistratMedicamento(medicamento: MedicamentoPersistencia): Observable<Mensaje> {
        const CREATE_MEDICAMENTO =gql`
            mutation($input:  MedicamentoPersistencia!){
                createMedicamento(input: $input) {
                error
                respuesta
            }
        }`;
        return this.apollo.mutate({
            mutation:CREATE_MEDICAMENTO,
            variables: {
                input: medicamento
            }
        }).pipe(map((result:any) => result.data.createMedicamento))
    }

    public graphEliminarMedicamento(id: number): Observable<Mensaje> {
        const DELETE_MEDICAMENTO = gql`
          mutation($id: ID!) {
            deleteMedicamento(id: $id) {
              error
              respuesta
            }
          }`;
        return this.apollo.mutate({
          mutation: DELETE_MEDICAMENTO,
          variables: {
            id: id
          }
        }).pipe(map((result: any) => result.data.deleteMedicamento));
    }

    public graphEditarMedicamento(id: number, medicamento: MedicamentoPersistencia): Observable<Mensaje> {
        const UPDATE_MEDICAMENTO= gql`
            mutation($id: ID!, $input: MedicamentoPersistencia!) {
                updateMedicamento(id: $id, input: $input){
                    error
                    respuesta
                }
            }`;
        return this.apollo.mutate({
            mutation: UPDATE_MEDICAMENTO,
            variables: {
                id: id,
                input: medicamento
            }
        }).pipe(map((result: any) => result.data.updateMedicamento));
          
    }
    
    
    }
  
