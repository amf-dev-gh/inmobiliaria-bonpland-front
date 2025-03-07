import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inmueble } from '../interfaces/inmueble.interface';
import { FormGroup } from '@angular/forms';
import { FiltroInmueble } from '../interfaces/filtro-inmueble.interface';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private apiUrl: string = 'http://localhost:8080/api/bonpland/inmuebles';

  constructor(private http: HttpClient) { }

  listarInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(this.apiUrl + '/listar');
  }

  filtrarInmuebles(form: FormGroup): Observable<Inmueble[]> {
    const cuerpo: FiltroInmueble = this.obtenerCuerpoFiltro(form);
    return this.http.post<Inmueble[]>(this.apiUrl + '/filtrar', cuerpo);
  }

  obtenerInmueblePorID(id: string|null): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}/${id}`);
  }

  guardar(inmueble: Inmueble) {
    return this.http.post(this.apiUrl + '/guardar', inmueble);
  }

  eliminar(id: string | null) {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  private obtenerCuerpoFiltro(form: FormGroup): FiltroInmueble {

    const obtenerValor = (campo: string) => {
      const valor = form.get(campo)?.value;
      return valor === undefined || valor === '' ? null : valor;
    };

    const cuerpo: FiltroInmueble = {
      pais: obtenerValor('pais'),
      ciudad: obtenerValor('ciudad'),
      barrio: obtenerValor('barrio'),
      cantidadAmbientesMin: obtenerValor('cantAmbientesMin'),
      cantidadAmbientesMax: obtenerValor('cantAmbientesMax'),
      costoMinimo: obtenerValor('precioMin'),
      costoMaximo: obtenerValor('precioMax'),
      metrosMinimos: obtenerValor('metrosMin'),
      metrosMaximos: obtenerValor('metrosMax'),
      tipoDeContratacion: obtenerValor('tipoContratacion'),
    };
    return cuerpo;
  }
}
