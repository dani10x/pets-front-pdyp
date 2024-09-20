import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from 'src/app/features/services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteConsulta } from 'src/app/features/models/cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InformeDialogComponent } from 'src/app/features/components/informe-dialog/informe-dialog.component';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
  dataSource!: MatTableDataSource<ClienteConsulta>;
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'acciones'];
  totalRegistros!: number;
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientesService: ClientesService, private toastrService: NbToastrService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ClienteConsulta>();
    this.consultarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private consultarClientes(): void {
    this.clientesService.listarClientes().subscribe({
      next: (res) => this.dataSource.data = res as ClienteConsulta[],
      error: (e) => console.error(e),
    });
  }

  public eliminarCliente(cliente: ClienteConsulta): void {
    this.loading = true;
    this.clientesService.eliminarCliente(cliente.id).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Eliminado', { status: 'success' });
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.consultarClientes());
  }

  public actualizarCliente(cliente: ClienteConsulta): void {
    this.router.navigate(['/inicio/clientes/form'], { state: { cliente } });
  }

  public openDialog(cliente: ClienteConsulta): void {
    this.dialog.open(InformeDialogComponent, {
      data: { id: cliente.id },
      height: '400px',
      width: '600px',
    });
  }
}
