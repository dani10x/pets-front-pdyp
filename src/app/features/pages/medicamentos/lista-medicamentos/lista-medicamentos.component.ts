import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NbToastrService } from '@nebular/theme';
import { MedicamentoConsulta } from 'src/app/features/models/medicamento.model';
import { MedicamentosService } from 'src/app/features/services/medicamentos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.scss']
})
export class ListaMedicamentosComponent implements OnInit, AfterViewInit{

  loading: boolean = false;
  dataSource!: MatTableDataSource<MedicamentoConsulta>;
  displayedColumns: string[] = ['nombre', 'descripcion', 'dosis', 'acciones'];
  totalRegistros!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private medicamentoService: MedicamentosService, private toastrService: NbToastrService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MedicamentoConsulta>();
    this.consultarMedicamentos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private consultarMedicamentos(): void {
    this.medicamentoService.graphListarMedicamentos().subscribe({
      next: (res) => {
        this.dataSource.data = res as MedicamentoConsulta[];
      },
      error: (e) => console.error(e),
    });
  }

  public eliminarMedicamentos(medicamento: MedicamentoConsulta): void {
    this.medicamentoService.graphEliminarMedicamento(medicamento.id).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Eliminado', { status: 'success' });
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.consultarMedicamentos());
  }

  public actualizarMedicamento(medicamento: MedicamentoConsulta): void {
    this.router.navigate(['/inicio/medicamentos/form'], { state: { medicamento } });
  }
}
