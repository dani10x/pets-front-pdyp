import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { FormMascotasComponent } from './form-mascotas/form-mascotas.component';
import { AddTratamientoComponent } from './add-tratamiento/add-tratamiento.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaMascotasComponent
  },
  {
    path: 'form',
    component: FormMascotasComponent
  },
  {
    path: 'tratamientos',
    component: AddTratamientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
