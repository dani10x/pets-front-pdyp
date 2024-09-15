import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { NbCardModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';

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
    ClientesRoutingModule
  ],
  providers: [],
})
export class ClientesModule { }
