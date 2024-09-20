import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ListaTratamientosComponent } from 'src/app/features/components/lista-tratamientos/lista-tratamientos.component';
import { MascotaConsulta } from 'src/app/features/models/mascota.model';
import { MedicamentoConsulta } from 'src/app/features/models/medicamento.model';
import { TratamientoPersistencia } from 'src/app/features/models/tratameinto.model';
import { ErrorService } from 'src/app/features/services/error.service';
import { MedicamentosService } from 'src/app/features/services/medicamentos.service';
import { TratamientosService } from 'src/app/features/services/tratamientos.service';

@Component({
  selector: 'app-add-tratamiento',
  templateUrl: './add-tratamiento.component.html',
  styleUrls: ['./add-tratamiento.component.scss']
})
export class AddTratamientoComponent implements OnInit {

  tratamientosForm!: FormGroup;
  medicamentos!: MedicamentoConsulta[];
  receivedData!: MascotaConsulta;
  maxDate!: Date;
  loading: boolean = false;
  @ViewChild(ListaTratamientosComponent) tratamientos!: ListaTratamientosComponent;

  constructor(private fb: FormBuilder,
    private errorService: ErrorService,
    private medicamentosService: MedicamentosService,
    private router: Router,
    private tratamientosService: TratamientosService,
    private datePipe: DatePipe,
    private toastrService: NbToastrService,) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.receivedData = history.state.mascota;
    this.initForm();
    this.medicamentosService.listarMedicamento().subscribe({
      next: (res) => this.medicamentos = res as MedicamentoConsulta[],
      error: (e) => console.error(e),
    });
  }

  private initForm(): void {
    this.tratamientosForm = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      medicamentosId: ['', [Validators.required]]
    });
  }

  public error(control: AbstractControl, nombre: string): string {
    return this.errorService.getErrorMessage(control, nombre);
  }

  public getFormControl(control: string): AbstractControl {
    return this.tratamientosForm.controls[control];
  }

  public navegarLista(): void {
    this.router.navigate(['/inicio/mascotas/lista'])
  }

  public registrarTratamiento(): void {
    this.loading = true;
    this.tratamientosService.registrarTratamiento(this.getTratamiento()).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Creado', { status: 'success' });
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.recargarTratamientos());
  }

  private getTratamiento(): TratamientoPersistencia {
    return {
      mascotasId: this.receivedData.id,
      fechaInicio: this.formatDate(this.tratamientosForm.get('fechaInicio')?.value),
      medicamentosId: this.tratamientosForm.get('medicamentosId')?.value,
    }
  }

  private resetForm(): void {
    this.tratamientosForm.reset({
      fechaInicio: '',
      medicamentosId: ''
    });
  }

  private formatDate(date: Date): string {
    let transform = this.datePipe.transform(date, "yyyy-MM-dd'T'HH:mm:ss", 'UTC');
    if(transform) {
      return transform;
    }
    return '';
  }

  private recargarTratamientos(): void {
    this.tratamientos.consultarTratamientos();
  }
}
