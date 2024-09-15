import { NgModule } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InicioComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    MatGridListModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbMenuModule,
    PagesRoutingModule,
    CommonModule
  ],
  providers: [],
})
export class PagesModule { }
