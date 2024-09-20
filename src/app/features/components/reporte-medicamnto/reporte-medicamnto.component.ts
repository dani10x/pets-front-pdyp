import { Component, Input } from '@angular/core';
import { ReporteTratamientosDTO } from '../../models/tratameinto.model';

@Component({
  selector: 'app-reporte-medicamnto',
  templateUrl: './reporte-medicamnto.component.html',
  styleUrls: ['./reporte-medicamnto.component.scss']
})
export class ReporteMedicamntoComponent {

  @Input() tratamiento!: ReporteTratamientosDTO;

  constructor() {}
}
