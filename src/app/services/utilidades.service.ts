import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  obtenerColorTexto(estado: string) {
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
