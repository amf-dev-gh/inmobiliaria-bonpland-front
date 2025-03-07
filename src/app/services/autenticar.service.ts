import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciales } from '../interfaces/credenciales';
import { Usuario } from '../interfaces/usuario';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  private apiUrl: string = "http://localhost:8080/api/bonpland/usuarios";
  private usuarioAdmin: Usuario = {
    id: 1,
    nombre: 'Administrador 1',
    username: 'admin',
    password: 'admin',
    rol: 'ADMIN',
    email: 'admin@mail.com',
    activo: true
  }

  constructor(private http: HttpClient) { }

  logOut() {
    window.sessionStorage.removeItem('USUARIO_ROL');
    window.sessionStorage.removeItem('USUARIO_NOMBRE');
    window.sessionStorage.removeItem('token');
  }

  getRol(): string {
    return sessionStorage.getItem('USUARIO_ROL') || '';
  }

  getNombre(): string {
    return sessionStorage.getItem('USUARIO_NOMBRE') || '';
  }

  setRol(u: Usuario) {
    window.sessionStorage.setItem('USUARIO_ROL', u.rol);
    window.sessionStorage.setItem('USUARIO_NOMBRE', u.username);
    window.sessionStorage.setItem('token', u.username);
  }

  //AUTENTICARSE DESDE LA APP BASICA, SIN SEGURIDAD
  autenticarse(credenciales: Credenciales):boolean {
    if (credenciales.username === this.usuarioAdmin.username && credenciales.password === this.usuarioAdmin.password) {
      this.setRol(this.usuarioAdmin);
      window.sessionStorage.setItem('USUARIO_NOMBRE', 'R8Sw&-%fnk:@6!$AD[jR-6jAWj');
      return true;
    }
    return false;
  }

  //AUTENTICARSE CON LA BBDD
  // autenticarse(credenciales: Credenciales): Observable<boolean> {
  //   return this.http.post<Usuario>(`${this.apiUrl}/autenticar`, credenciales).pipe(
  //     map(u => {
  //       this.setRol(u);
  //       return true;
  //     }),
  //     catchError(error => {
  //       console.error("Usuario o contraseña inválidos", error);
  //       return of(false);
  //     })
  //   );
  // }

  //PENDIENTE
  bloquearUsuario(value: string) {
    console.log(`Usuario ${value} bloqueado.`)
  }
}
