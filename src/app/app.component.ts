import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AutenticarService } from './services/autenticar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  fecha: Date = new Date();
  anio: number = this.fecha.getFullYear();
  autorizado: boolean = false;

  constructor(private autService: AutenticarService, private router: Router) { }

  ngOnInit(): void {
    this.autorizado = this.autService.getRol() === "ADMIN";
  }

  salir() {
    this.autService.logout();
    this.router.navigate(["/login"]).then(() => window.location.reload());
  }

}
