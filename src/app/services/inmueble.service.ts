import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Inmueble } from '../interfaces/inmueble.interface';
import { FormGroup } from '@angular/forms';
import { FiltroInmueble } from '../interfaces/filtro-inmueble.interface';
import { AutenticarService } from './autenticar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private apiUrl: string = 'http://localhost:8080/api/bonpland/inmuebles';

  constructor(private http: HttpClient, private autService: AutenticarService, private router: Router) { }

  listarInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(this.apiUrl + '/listar');
  }

  filtrarInmuebles(form: FormGroup): Observable<Inmueble[]> {
    const cuerpo: FiltroInmueble = this.obtenerCuerpoFiltro(form);
    return this.http.post<Inmueble[]>(this.apiUrl + '/filtrar', cuerpo);
  }

  obtenerInmueblePorID(id: string | null): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}/detalle/${id}`);
  }

  guardar(inmueble: Inmueble) {
    if (this.autService.tokenExpirado()) {
      this.autService.logout();
      alert("Sesion expirada. Debe iniciar sesion nuevamente.");
      return throwError(() => new Error("Sesión expirada"));
    }
    return this.http.post(this.apiUrl + '/guardar', inmueble, { headers: this.obtenerHeaders() });
  }

  eliminar(id: string | null) {
    if (this.autService.tokenExpirado()) {
      this.autService.logout();
      alert("Sesion expirada. Debe iniciar sesion nuevamente.");
      return throwError(() => new Error("Sesión expirada"));
    }
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { headers: this.obtenerHeaders() });
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

  private obtenerHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.autService.getToken()}`);
  }

}
