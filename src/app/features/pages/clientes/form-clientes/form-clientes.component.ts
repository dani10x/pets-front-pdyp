import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClienteConsulta, ClientePersistencia, ClienteUpdate } from 'src/app/features/models/cliente.model';
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
  receivedData!: ClienteConsulta;

  constructor(private fb: FormBuilder,
    private clientesService: ClientesService,
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
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+$')]]
    });
  }

  private setForm(cliente: ClienteConsulta): void {
    this.clienteForm.setValue({
      cedula: cliente.cedula,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion,
      telefono: cliente.telefono
    });
  }

  public error(control: AbstractControl, nombre: string): string {
    return this.errorService.getErrorMessage(control, nombre);
  }

  public getFormControl(control: string): AbstractControl {
    return this.clienteForm.controls[control];
  }

  public registrar(): void {
    this.receivedData ? this.actualizarCliente() : this.guardarCliente();
  }

  private guardarCliente(): void {
    this.loading = true;
    this.clientesService.graphRegistrarCliente(this.clienteForm.value as ClientePersistencia).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Registrado', { status: 'success' })
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    });
  }

  private actualizarCliente(): void {
    this.loading = true;
    this.clientesService.graphEditarCliente(this.receivedData.id, this.getClientePersistencia()).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Actualizado', { status: 'success' })
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.navegarLista());
  }

  private getCliente(): ClienteUpdate {
    return {
      id: this.receivedData.id,
      apellidos: this.clienteForm.get('apellidos')?.value,
      cedula: this.clienteForm.get('cedula')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      nombres: this.clienteForm.get('nombres')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    }
  }

  private getClientePersistencia(): ClientePersistencia {
    return {
      apellidos: this.clienteForm.get('apellidos')?.value,
      cedula: this.clienteForm.get('cedula')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      nombres: this.clienteForm.get('nombres')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    }
  }

  private resetForm(): void {
    this.clienteForm.reset({
      cedula: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: ''
    });
  }

  public navegarLista(): void {
    this.router.navigate(['/inicio/clientes/lista'])
  }

}
