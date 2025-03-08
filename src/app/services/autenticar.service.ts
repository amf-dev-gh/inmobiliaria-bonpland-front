import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpLoginResponse, LoginUsuario } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  private apiUrl: string = "http://localhost:8080/api/bonpland/usuarios";

  constructor(private http: HttpClient, private router: Router) { }

  getRol(): string {
    return sessionStorage.getItem('USUARIO_ROL') || '';
  }

  getToken(): string {
    return sessionStorage.getItem('USUARIO_TOKEN') || '';
  }

  setSession(response: HttpLoginResponse) {
    window.sessionStorage.setItem('USUARIO_ROL', response.rol);
    window.sessionStorage.setItem('USUARIO_TOKEN', response.token);
    window.sessionStorage.setItem('USUARIO_TOKEN_EXPIRACION', response.expiracion.toString());
    window.sessionStorage.setItem('USUARIO_TOKEN_INGRESO', (new Date().getTime().toString()));
  }

  tokenExpirado(): boolean {
    const horaIngreso = window.sessionStorage.getItem('USUARIO_TOKEN_INGRESO');
    const tiempoExpiracion = window.sessionStorage.getItem('USUARIO_TOKEN_EXPIRACION');
    const horaActual = new Date().getTime().toString();
    const diferencia = (Number(horaActual) - Number(horaIngreso))
    return diferencia >= Number(tiempoExpiracion);
  }

  //AUTENTICARSE CON LA BBDD
  autenticarse(loginUsuario: LoginUsuario): Observable<boolean> {
    console.log(loginUsuario)
    return this.http.post<HttpLoginResponse>(`${this.apiUrl}/login`, loginUsuario).pipe(
      map(response => {
        this.setSession(response);
        return true;
      }),
      catchError(error => {
        console.error("Usuario o contraseña inválidos", error);
        return of(false);
      })
    );
  }

  logout() {
    sessionStorage.clear();
  }

  //Modo de ejemplo
  bloquearUsuario(value: string) {
    console.log(`Usuario ${value} bloqueado.`)
  }
}
