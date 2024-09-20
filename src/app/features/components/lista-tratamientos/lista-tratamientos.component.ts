import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TratamientosService } from '../../services/tratamientos.service';
import { TratamientoMascota } from '../../models/tratameinto.model';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-lista-tratamientos',
  templateUrl: './lista-tratamientos.component.html',
  styleUrls: ['./lista-tratamientos.component.scss']
})
export class ListaTratamientosComponent implements OnInit {

  dataSource!: MatTableDataSource<TratamientoMascota>;
  displayedColumns: string[] = ['medicamento', 'dosis', 'fecha', 'acciones'];
  totalRegistros!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() idMascota!: number;

  constructor(private tratamientosService: TratamientosService, private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TratamientoMascota>();
    this.consultarTratamientos();
  }

  public consultarTratamientos(): void {
    this.tratamientosService.consultarTratamientosMascota(this.idMascota).subscribe({
      next: (res) => this.dataSource.data = res as TratamientoMascota[],
      error: (e) => console.error(e),
    });
  }

  public eliminarTratamiento(tratamiento: TratamientoMascota): void {
    this.tratamientosService.eliminarTratamiento(tratamiento.id).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Eliminado', { status: 'success' });
      },
      error: (e) => console.error(e),
    }).add(() => this.consultarTratamientos());
  }
}
