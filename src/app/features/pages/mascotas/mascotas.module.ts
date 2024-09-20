import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { FormMascotasComponent } from './form-mascotas/form-mascotas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { AddTratamientoComponent } from './add-tratamiento/add-tratamiento.component';
import {MatDividerModule} from '@angular/material/divider';
import { EdadPipe } from '../../pipes/edad.pipe';
import { ListaTratamientosComponent } from '../../components/lista-tratamientos/lista-tratamientos.component';

@NgModule({
  declarations: [
    ListaMascotasComponent,
    FormMascotasComponent,
    AddTratamientoComponent,
    ListaTratamientosComponent,
    EdadPipe
  ],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    MascotasRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NbSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [DatePipe, EdadPipe],
  exports: [EdadPipe]
})
export class MascotasModule { }
