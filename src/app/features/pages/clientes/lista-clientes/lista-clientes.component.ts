import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/features/services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteConsulta } from 'src/app/features/models/cliente.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<ClienteConsulta>;
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'acciones'];
  totalRegistros!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ClienteConsulta>();
    this.clientesService.listarClientes().subscribe({
      next: (res) => this.dataSource.data = res as ClienteConsulta[],
      error: (e) => console.error(e),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




}
