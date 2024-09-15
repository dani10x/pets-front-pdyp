import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaClientesComponent
  },
  {
    path: 'form',
    component: FormClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
