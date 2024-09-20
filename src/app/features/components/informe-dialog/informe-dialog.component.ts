import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from '../../services/clientes.service';
import { ReporteClienteDTO } from '../../models/cliente.model';

@Component({
  selector: 'app-informe-dialog',
  templateUrl: './informe-dialog.component.html',
  styleUrls: ['./informe-dialog.component.scss']
})
export class InformeDialogComponent implements OnInit {

  cliente!: ReporteClienteDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.clientesService.generarReporte(this.data.id).subscribe({
      next: (res) => this.cliente = res as ReporteClienteDTO,
      error: (e) => console.error(e)
    });
  }
}
