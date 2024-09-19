import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { map, Observable, startWith } from 'rxjs';
import { ClienteAutoComplete } from 'src/app/features/models/cliente.model';
import { MascotaConsulta, MascotaPersistencia, MascotaUpdate } from 'src/app/features/models/mascota.model';
import { ClientesService } from 'src/app/features/services/clientes.service';
import { ErrorService } from 'src/app/features/services/error.service';
import { MascotasService } from 'src/app/features/services/mascotas.service';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form-mascotas.component.html',
  styleUrls: ['./form-mascotas.component.scss']
})
export class FormMascotasComponent implements OnInit {

  mascotasForm!: FormGroup;
  clientes: ClienteAutoComplete[] = [];
  clientesFiltrados!: Observable<ClienteAutoComplete[]>;
  loading: boolean = false;
  receivedData!: MascotaConsulta;

  constructor(private fb: FormBuilder,
    private errorService: ErrorService,
    private toastrService: NbToastrService,
    private clienteServices: ClientesService,
    private mascotasService: MascotasService,
    private datePipe: DatePipe,
    private router: Router) {}

  ngOnInit(): void {
    this.receivedData = history.state.mascota;
    this.initForm();
    this.clienteServices.consultarAutocompletable().subscribe({
      next: (res) => this.clientes = res as ClienteAutoComplete[],
      error: (e) => console.error(e),
    });
    if(this.receivedData) {
      this.setForm(this.receivedData)
    }
  }

  public error(control: AbstractControl, nombre: string): string {
    return this.errorService.getErrorMessage(control, nombre);
  }

  public getFormControl(control: string): AbstractControl {
    return this.mascotasForm.controls[control];
  }

  private initForm(): void {
    this.mascotasForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      raza: ['', [Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaNacimiento: ['', [Validators.required]],
      idCliente: ['', [Validators.required]]
    });
  }

  public registrar(): void {
    this.receivedData ? this.actualizarMascota() : this.nuevaMascota();
  }

  private nuevaMascota(): void {
    this.loading = true;
    let mascota = this.mascotasForm.value as MascotaPersistencia;
    mascota.fechaNacimiento = this.formatDate(mascota.fechaNacimiento);
    this.mascotasService.agregarMascota(mascota).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Registrado', { status: 'success' });
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    })
  }

  private actualizarMascota(): void {
    this.loading = true;
    this.mascotasService.actualizarMascota(this.obtenerMascota()).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Actualizado', { status: 'success' });
        this.resetForm();
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.navegarLista());
  }

  private obtenerMascota(): MascotaUpdate {
    return {
      id: this.receivedData.id,
      fechaNacimiento: this.mascotasForm.get('fechaNacimiento')?.value,
      idCliente: this.mascotasForm.get('idCliente')?.value,
      nombre: this.mascotasForm.get('nombre')?.value,
      peso: this.mascotasForm.get('peso')?.value,
      raza: this.mascotasForm.get('raza')?.value,
    }
  }

  private resetForm(): void {
    this.mascotasForm.reset({
      nombre: '',
      raza: '',
      peso: '',
      fechaNacimiento: '',
      idCliente: ''
    });
  }

  formatDate(date: Date): string {
    let transform = this.datePipe.transform(date, "yyyy-MM-dd'T'HH:mm:ss", 'UTC');
    if(transform) {
      return transform;
    }
    return '';
  }

  private setForm(mascota: MascotaConsulta): void {
    this.mascotasForm.setValue({
      nombre: mascota.nombre,
      raza: mascota.raza,
      peso: mascota.peso,
      fechaNacimiento: mascota.fechaNacimiento,
      idCliente: mascota.idCliente
    });
  }

  public navegarLista(): void {
    this.router.navigate(['/inicio/mascotas/lista'])
  }
}
