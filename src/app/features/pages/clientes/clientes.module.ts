import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { InformeDialogComponent } from '../../components/informe-dialog/informe-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ReporteMascotaComponent } from '../../components/reporte-mascota/reporte-mascota.component';
import { MascotasModule } from '../mascotas/mascotas.module';
import { ReporteMedicamntoComponent } from '../../components/reporte-medicamnto/reporte-medicamnto.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    ListaClientesComponent,
    FormClientesComponent,
    InformeDialogComponent,
    ReporteMascotaComponent,
    ReporteMedicamntoComponent
  ],
  imports: [
    MatGridListModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    ClientesRoutingModule,
    MatTableModule,
    NbButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    NbSpinnerModule,
    MatDialogModule,
    MascotasModule,
    MatDividerModule
  ],
  providers: [],
})
export class ClientesModule { }
