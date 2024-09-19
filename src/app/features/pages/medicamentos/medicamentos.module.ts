import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListaMedicamentosComponent } from './lista-medicamentos/lista-medicamentos.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbSpinnerModule } from '@nebular/theme';
import { FormMedicamentosComponent } from './form-medicamentos/form-medicamentos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
      ListaMedicamentosComponent,
      FormMedicamentosComponent
    ],
    imports: [
      CommonModule,
      NbEvaIconsModule,
      MedicamentosRoutingModule,
      MatTableModule,
      MatPaginatorModule,
      NbCardModule,
      NbIconModule,
      NbButtonModule,
      NbSpinnerModule,
      FormsModule,
      MatGridListModule,
      NbLayoutModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatButtonModule,
    ],
    providers: [],
  })
  export class MedicamentosModule { }
  