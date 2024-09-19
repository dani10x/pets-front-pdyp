import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { FormMascotasComponent } from './form-mascotas/form-mascotas.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaMascotasComponent
  },
  {
    path: 'form',
    component: FormMascotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
