import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../interfaces/inmueble.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InmuebleService } from '../../services/inmueble.service';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../../services/ubicacion.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-filtrar',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [InmuebleService, UbicacionService],
  templateUrl: './filtrar.component.html',
  styleUrl: './filtrar.component.css'
})
export class FiltrarComponent implements OnInit {

  inmuebles: Inmueble[] = [];
  filtroForm: FormGroup;
  paises: string[] = [];
  sinResultado: boolean = false;
  filtrado: boolean = false

  // Variables para los valores máximos fijos
  mMax: number = 0;
  cMax: number = 0;
  aMax: number = 0;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private ubicacionService: UbicacionService,
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
    this.listarPaises();
  }

  buscar(): void {
    this.inmuebleService.filtrarInmuebles(this.filtroForm).subscribe(
      {
        next: imbs => {
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
    });
  }

  listarPaises(): void {
    this.ubicacionService.obtenerPaises().pipe(
      catchError(error => {
        console.error("Error al listar países:", error);
        return this.paises = [];
      })
    ).subscribe(paises => this.paises = paises);
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

  masInfo(id: string) {
    this.router.navigate([`/detalle/${id}`])
  }

  obtenerColor(estado: string) {
    return this.utilService.obtenerColorTexto(estado);
  }
}