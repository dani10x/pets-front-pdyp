import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

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
}
