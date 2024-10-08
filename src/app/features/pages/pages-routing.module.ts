import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import("./clientes/clientes.module").then((m) => m.ClientesModule),
      },
      {
        path: 'mascotas',
        loadChildren: () => import("./mascotas/mascotas.module").then((m) => m.MascotasModule),
      },
      {
        path: 'medicamentos',
        loadChildren: () => import("./medicamentos/medicamentos.module").then((m) => m.MedicamentosModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
