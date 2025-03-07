import { Component } from '@angular/core';
import { AutenticarService } from '../../services/autenticar.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciales } from '../../interfaces/credenciales';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private MAXIMO_INTENTOS: number = 3;
  intentos: number = 0;
  infoIntentos: string = "";
  formLogin: FormGroup;

  constructor(private autService: AutenticarService, private fb: FormBuilder, private router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const credenciales: Credenciales = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value,
    }

    const autenticado: boolean = this.autService.autenticarse(credenciales);
    if (autenticado) {
      this.router.navigate(['/admin']).then(() => window.location.reload());
    }
    else {
      console.log("Fallo en la autenticación");
      this.intentos++;
      if (this.intentos >= this.MAXIMO_INTENTOS) {
        this.autService.bloquearUsuario(this.formLogin.get('username')?.value);
        alert("Ha llegado al maximo de intentos fallidos. Usuario bloqueado.");
        this.router.navigate(['/']);
      }
      this.infoIntentos = 'Usuario o contraseña incorrectos. Le quedan ' + (this.MAXIMO_INTENTOS - this.intentos) + ' intentos.';
    }
  }

    // LINEA PARA AUTENTICARSE DESDE LA BBDD
    // this.autService.autenticarse(credenciales).subscribe(autenticado => {
    //   if (autenticado) {
    //     this.router.navigate(['/admin']).then(() => {
    //       window.location.reload();
    //     });
    //   } else {
    //     console.log("Fallo en la autenticación");
    //     this.intentos++;
    //   if (this.intentos >= this.MAXIMO_INTENTOS) {
    //     this.autService.bloquearUsuario(this.formLogin.get('username')?.value);
    //     alert("Ha llegado al maximo de intentos fallidos. Usuario bloqueado.");
    //     this.router.navigate(['/']);
    //   }
    //   this.infoIntentos = 'Usuario o contraseña incorrectos. Le quedan ' + (this.MAXIMO_INTENTOS - this.intentos) + ' intentos.';
    //   }
    // });
    // }

}
