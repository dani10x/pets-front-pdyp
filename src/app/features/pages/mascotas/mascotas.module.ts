import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ListaMascotasComponent
  ],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    MascotasRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule
  ]
})
export class MascotasModule { }
