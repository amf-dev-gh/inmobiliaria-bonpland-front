import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  error: string = "";
  mensaje: string = "";
  inicio:boolean = false;
  acceder:boolean = false

  ngOnInit(): void {
    this.validarError();
  }

  constructor(private ruta: ActivatedRoute) {
  }

  validarError() {
    const e: string | null = this.ruta.snapshot.paramMap.get('error');
    switch (e) {
      case "no-autorizado":
        this.error = '¡ERROR AUTENTICACION!';
        this.mensaje = 'Necesita estar autenticado para ingresar en esta url';
        this.acceder = true;
        break;
      default:
        this.error = 'ERROR DE URL';
        this.mensaje = 'Esta pagina no existe';
        this.inicio = true;
        break;
    }
  }

}
