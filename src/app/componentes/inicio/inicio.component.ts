import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../interfaces/inmueble.interface';
import { InmuebleService } from '../../services/inmueble.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  inmuebles: Inmueble[] = [];

  constructor(private inmuebleService: InmuebleService, private router: Router) { }

  ngOnInit(): void {
    this.listarInmueblesRecientes();
  }

  private listarInmueblesRecientes(): void {
    this.inmuebleService.listarInmuebles().subscribe(
      {
        next: i => this.inmuebles = this.obtenerDisponibles(i),
        error: e => console.error("Ocurrio un error", e)
      }
    )
  }

  private obtenerDisponibles(lista: Inmueble[]): Inmueble[] {
    return lista.filter(
      i => i.estado === "Disponible" || i.estado === "Reservado"
    ).slice(-4)
  }

  masInfo(id: string | null) {
    this.router.navigate([`/detalle/${id}`])
  }

  obtenerColor(estado: string) {
    switch (estado) {
      case "Disponible":
        return "green";
      case "Reservado":
        return "orange";
      case "Vendido":
        return "red";
      case "Alquilado":
        return "blue";
    }
    return 'black';
  }



}
