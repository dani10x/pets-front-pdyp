import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    ListaClientesComponent
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
    MatPaginatorModule
  ],
  providers: [],
})
export class ClientesModule { }
