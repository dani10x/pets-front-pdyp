import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMedicamentosComponent } from './lista-medicamentos/lista-medicamentos.component';
import { FormMedicamentosComponent } from './form-medicamentos/form-medicamentos.component';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaMedicamentosComponent
  },
  {
    path: 'form',
    component: FormMedicamentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentosRoutingModule { }
