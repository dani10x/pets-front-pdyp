import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noop } from 'rxjs';
import { ClientesService } from 'src/app/features/services/clientes.service';
import { ErrorService } from 'src/app/features/services/error.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {

  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private clientesService: ClientesService,
    private errorService: ErrorService) {}

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

}
