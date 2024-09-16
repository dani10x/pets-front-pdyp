import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { noop } from 'rxjs';
import { ClientePersistencia } from 'src/app/features/models/cliente.model';
import { ClientesService } from 'src/app/features/services/clientes.service';
import { ErrorService } from 'src/app/features/services/error.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {

  clienteForm!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private clientesService: ClientesService,
    private errorService: ErrorService,
    private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+$')]]
    });
  }

  public error(control: AbstractControl, nombre: string): string {
    return this.errorService.getErrorMessage(control, nombre);
  }

  public getFormControl(control: string): AbstractControl {
    return this.clienteForm.controls[control];
  }

  public registrar(): void {
    this.loading = true;
    this.clientesService.registrarCliente(this.clienteForm.value as ClientePersistencia).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Registrado', { status: 'success' })
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.loading = false);
  }

  private getCliente(): ClientePersistencia {
    return this.clienteForm.value as ClientePersistencia;
  }

  private resetForm(): void {
    this.clienteForm.reset({
      cedula: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: ''
    })
  }

}
