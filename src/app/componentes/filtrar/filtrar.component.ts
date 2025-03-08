import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../interfaces/inmueble.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InmuebleService } from '../../services/inmueble.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-filtrar',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './filtrar.component.html',
  styleUrl: './filtrar.component.css'
})
export class FiltrarComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  filtroForm: FormGroup;
  paises: string[] = [];
  ciudades: string[] = [];
  sinResultado: boolean = false;
  filtrado: boolean = false

  // Variables para los valores máximos fijos
  mMax: number = 0;
  cMax: number = 0;
  aMax: number = 0;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private router: Router,
    private utilService: UtilidadesService
  ) {
    this.filtroForm = this.fb.group({
      pais: [''],
      ciudad: [''],
      barrio: [''],
      precioMin: [''],
      precioMax: [''],
      metrosMin: [''],
      metrosMax: [''],
      tipoContratacion: [''],
      cantAmbientesMin: [''],
      cantAmbientesMax: ['']
    });
  }

  ngOnInit(): void {
    this.listarInmuebles();
    this.filtroForm.get('pais')?.valueChanges.subscribe((p) => {
      this.actualizarCiudades(p);
    });
  }

  buscar(): void {
    this.inmuebleService.filtrarInmuebles(this.filtroForm).subscribe(
      {
        next: imbs => {
          //Si quisiera mostrar la lista filtrada sin los que estan vendidos o alquilados
          //this.inmuebles = imbs.filter(i => i.estado === "Disponible" || i.estado === "Reservado");
          this.inmuebles = imbs.filter(i => i.estado === "Disponible" || i.estado === "Reservado");
          this.sinResultado = false;
        },
        error: e => {
          console.error("Error o inmuebles no encontrados", e);
          this.inmuebles = [];
          this.sinResultado = true;
        }
      }
    );
    this.filtrado = true;
  }

  borrarFiltros() {
    this.listarInmuebles();
    this.sinResultado = false;
    this.filtrado = false;
    this.asignarValoresMinMax();
  }

  listarInmuebles(): void {
    this.inmuebleService.listarInmuebles().pipe(
      catchError(error => {
        console.error("Error al listar inmuebles:", error);
        return this.inmuebles = [];
      })
    ).subscribe(data => {
      this.inmuebles = data;
      this.asignarValoresMinMax();
      this.paises = [...new Set(this.inmuebles.map(i => i.pais))];
      this.ciudades = [...new Set(this.inmuebles.map(i => i.ciudad))];
    });
  }

  asignarValoresMinMax(): void {
    if (!this.inmuebles.length) return;
    // Calcular valores mínimos y máximos
    this.cMax = Math.max(...this.inmuebles.map(i => i.costo));
    this.mMax = Math.max(...this.inmuebles.map(i => i.metrosCuadrados));
    this.aMax = Math.max(...this.inmuebles.map(i => i.cantAmbientes));
    // Solo inicializar el formulario con los valores mínimos
    this.filtroForm.patchValue({
      pais: '',
      ciudad: '',
      barrio: '',
      precioMin: 0,
      precioMax: this.cMax,
      metrosMin: 0,
      metrosMax: this.mMax,
      cantAmbientesMin: 1,
      cantAmbientesMax: this.aMax
    });
  }

  masInfo(id: string | null) {
    this.router.navigate([`/detalle/${id}`])
  }

  obtenerColor(estado: string) {
    return this.utilService.obtenerColorTexto(estado);
  }

  actualizarCiudades(paisSeleccionado: string) {
    this.ciudades = [...new Set(this.inmuebles
      .filter(inmueble => inmueble.pais === paisSeleccionado)
      .map(inmueble => inmueble.ciudad))];

    // Reinicia la selección de ciudad cuando se cambia de país
    this.filtroForm.get('ciudad')?.setValue('');
  }
}