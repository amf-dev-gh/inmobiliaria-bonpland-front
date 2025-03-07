import { Component, OnInit } from '@angular/core';
import { InmuebleService } from '../../services/inmueble.service';
import { Inmueble } from '../../interfaces/inmueble.interface';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-administrar',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css'
})
export class AdministrarComponent {

}
