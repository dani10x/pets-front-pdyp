import { Component, Input } from '@angular/core';
import { ReporteMascotasDTO } from '../../models/mascota.model';

@Component({
  selector: 'app-reporte-mascota',
  templateUrl: './reporte-mascota.component.html',
  styleUrls: ['./reporte-mascota.component.scss']
})
export class ReporteMascotaComponent {

  @Input() mascota!: ReporteMascotasDTO;

  constructor() {}
}
