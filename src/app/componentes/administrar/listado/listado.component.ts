import { Component } from '@angular/core';
import { Inmueble } from '../../../interfaces/inmueble.interface';
import { InmuebleService } from '../../../services/inmueble.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado',
  imports: [RouterModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  inmuebles: Inmueble[] = [];

  constructor(private inmuebleService: InmuebleService, private router: Router) { }

  ngOnInit(): void {
    this.listarInmuebles()
  }

  private listarInmuebles() {
    this.inmuebleService.listarInmuebles().subscribe(
      {
        next: i => this.inmuebles = i,
        error: e => {
          console.error("Error al listar como ADMIN", e);
          this.inmuebles = [];
        }
      }
    )
  }

  editarInmueble(id: number) {
    alert(`Se editara el inmueble  ${id}`);
  }

  eliminarInmueble(id: string | null) {
    const confirma: boolean = confirm(`Se eliminara el inmueble con id ${id}. ¿Está seguro?`);
    if (confirma) {
      this.inmuebleService.eliminar(id).subscribe(
        {
          next: data => {
            console.log("Eliminado", data);
            window.location.reload();
          },
          error: e => {
            console.error("Error al eliminar", e);
            this.router.navigate(['/login']).then(() => window.location.reload());
          }
        }
      );
    };
  }
}
