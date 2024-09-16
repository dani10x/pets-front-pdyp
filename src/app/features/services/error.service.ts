import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: NbToastrService) { }

  public getErrorMessage(control: AbstractControl, nombre: string): string {
    if (control.errors) {
      if (control.errors['required']) {
        return nombre + ' es obligatorio.';
      }
      if (control.errors['maxlength']) {
        return nombre + ' debe tener máximo ' + control.errors['maxlength'].requiredLength + ' caracteres';
      }
      if (control.errors['min']) {
        return nombre + ' debe ser mayor o igual a ' + control.errors['min'].min;
      }
      if (control.errors['max']) {
        return nombre + ' no debe ser mayor a ' + control.errors['max'].max;
      }
      if (control.errors['email']) {
        return nombre + ' no es valido';
      }
      if (control.errors['pattern']) {
        return nombre + ' no tiene un formato valido';
      }
      if (control.errors['minlength']) {
        return nombre + ' debe tener minimo ' + control.errors['minlength'].requiredLength + ' caracteres';
      }
      if (control.errors['matDatepickerMax']) {
        return nombre + ' no es valida';
      }
    }
    return '';
  }

  public handleError(error: HttpErrorResponse): void {
    let mensaje = '';
    let titulo = '';
    let estado: 'danger' | 'warning' = 'danger';
    if(error.status === 500) {
      mensaje = 'Ha ocurrido un error procesando la solicitud';
      titulo = 'Error';
    }
    else if(error.status === 504) {
      mensaje = 'El servidor no se encuentra disponible';
      titulo = 'Error';
    }
    else {
      mensaje = error.error.respuesta;
      titulo = 'Aviso';
      estado = 'warning';
    }
    this.toastrService.show(mensaje, titulo, { status: estado });
  }


}
