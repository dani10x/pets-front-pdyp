import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { noop } from 'rxjs';
import { MedicamentoConsulta, MedicamentoPersistencia, MedicamentoUpdate } from 'src/app/features/models/medicamento.model';
import { MedicamentosService } from 'src/app/features/services/medicamentos.service';
import { ErrorService } from 'src/app/features/services/error.service';

@Component({
  selector: 'app-form-medicamentos',
  templateUrl: './form-medicamentos.component.html',
  styleUrls: ['./form-medicamentos.component.scss']
})
export class FormMedicamentosComponent implements OnInit {

  MedicamentoForm!: FormGroup;
  loading: boolean = false;
  receivedData!: MedicamentoConsulta;

  constructor(private fb: FormBuilder,
    private medicamentoService: MedicamentosService,
    private errorService: ErrorService,
    private toastrService: NbToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.receivedData = history.state.cliente;
    this.initForm();
    if(this.receivedData) {
      this.setForm(this.receivedData)
    }
  }

  private initForm(): void {
    this.MedicamentoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      dosis: ['', [Validators.required]]
    });
  }

  private setForm(medicamento: MedicamentoConsulta): void {
    this.MedicamentoForm.setValue(medicamento);
  }

  public error(control: AbstractControl, nombre: string): string {
    return this.errorService.getErrorMessage(control, nombre);
  }

  public getFormControl(control: string): AbstractControl {
    return this.MedicamentoForm.controls[control];
  }

  public registrar(): void {
    this.receivedData ? this.actualizarMedicamento() : this.guardarMedicamento();
  }

  private guardarMedicamento(): void {
    this.loading = true;
    this.medicamentoService.registrarMedicamento(this.MedicamentoForm.value as MedicamentoPersistencia).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Registrado', { status: 'success' })
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    });
  }

  private actualizarMedicamento(): void {
    this.loading = true;
    this.medicamentoService.editarMedicamento(this.getMedicamento()).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Actualizado', { status: 'success' })
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.navegarLista());
  }

  private getMedicamento(): MedicamentoUpdate {
    return {
      id: this.receivedData.id,
      nombre: this.MedicamentoForm.get('nombre')?.value,
      descripcion: this.MedicamentoForm.get('descripcion')?.value,
      dosis: this.MedicamentoForm.get('dosis')?.value,
    }
  }

  private resetForm(): void {
    this.MedicamentoForm.reset({
      nombre: '',
      descripcion: '',
      dosis: '',
    });
  }

  public navegarLista(): void {
    this.router.navigate(['/inicio/medicamentos/lista'])
  }
}
