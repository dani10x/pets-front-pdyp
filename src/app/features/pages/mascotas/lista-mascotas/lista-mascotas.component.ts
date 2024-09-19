import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { MascotaConsulta } from 'src/app/features/models/mascota.model';
import { MascotasService } from 'src/app/features/services/mascotas.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.scss']
})
export class ListaMascotasComponent implements OnInit, AfterViewInit{

  loading: boolean = false;
  dataSource!: MatTableDataSource<MascotaConsulta>;
  displayedColumns: string[] = ['nombre', 'raza', 'cliente', 'acciones'];
  totalRegistros!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mascotasService: MascotasService, private toastrService: NbToastrService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<MascotaConsulta>();
    this.consultarMascotas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private consultarMascotas(): void {
    this.mascotasService.listarMascotas().subscribe({
      next: (res) => this.dataSource.data = res as MascotaConsulta[],
      error: (e) => console.error(e),
    });
  }

  public eliminarMascotas(mascota: MascotaConsulta): void {
    this.mascotasService.elimianrMascota(mascota.id).subscribe({
      next: (res) => {
        this.toastrService.show(res.respuesta, 'Eliminado', { status: 'success' });
      },
      error: (e) => console.error(e),
      complete: () => this.loading = false,
    }).add(() => this.consultarMascotas());
  }

  public actualizarMascota(mascota: MascotaConsulta): void {
    this.router.navigate(['/inicio/mascotas/form'], { state: { mascota } });
  }
}
