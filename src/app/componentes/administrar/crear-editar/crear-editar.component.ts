import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../../interfaces/inmueble.interface';
import { InmuebleService } from '../../../services/inmueble.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-editar',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './crear-editar.component.html',
  styleUrl: './crear-editar.component.css'
})
export class CrearEditarComponent implements OnInit {

  nuevo: boolean = false
  error: boolean = false;
  subtitulo: string = ""
  titulo: string = "";
  inmueble: Inmueble = {
    id: '',
    pais: '',
    ciudad: '',
    barrio: '',
    metrosCuadrados: 0,
    cantAmbientes: 0,
    tipoDeContratacion: '',
    costo: 0,
    estado: '',
    imgUrl: '',
    fechaCreacion: '',
    fechaModificacion: '',
    infoAdicional: ''
  };
  formulario: FormGroup;

  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (id != null) {
      this.obtenerInmueble();
    } else {
      this.crearInmueble();
    }
  }

  constructor(private inmuebleService: InmuebleService, private ruta: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      id: [''],
      pais: [''],
      ciudad: [''],
      barrio: [''],
      mtsCuadrados: [''],
      cantAmbientes: [''],
      tipoContratacion: [''],
      costo: [''],
      imgUrl: [''],
      estado: [''],
      fechaCreacion: [''],
      fechaModificacion: [''],
      infoAdicional: ['']
    });
  }

  obtenerInmueble() {
    this.nuevo = false;
    const id = this.ruta.snapshot.paramMap.get('id');
    this.inmuebleService.obtenerInmueblePorID(id).subscribe(
      {
        next: i => {
          this.inmueble = i;
          this.titulo = `Editando inmueble con ID: ${this.inmueble.id} - Creado el ${this.inmueble.fechaCreacion}`;
          this.formulario.patchValue({
            id: this.inmueble.id,
            pais: this.inmueble.pais,
            ciudad: this.inmueble.ciudad,
            barrio: this.inmueble.barrio,
            mtsCuadrados: this.inmueble.metrosCuadrados,
            cantAmbientes: this.inmueble.cantAmbientes,
            tipoContratacion: this.inmueble.tipoDeContratacion,
            costo: this.inmueble.costo,
            imgUrl: this.inmueble.imgUrl,
            estado: this.inmueble.estado,
            infoAdicional: this.inmueble.infoAdicional
          })
        },
        error: e => {
          console.error("Inmueble no encontrado", e);
          this.titulo = "No es posible editar este inmueble o ya no existe en la base de datos";
          this.subtitulo = "¡SE REDIRECCIONA AL LISTADO!..."
          this.error = true;
          setTimeout(() => {
            this.error = false;
            this.router.navigate(['/admin']);
          }, 3000);
        }
      }
    );
  }

  crearInmueble() {
    this.nuevo = true;
    this.titulo = "Creando nuevo inmueble"
  }

  guardarCambios() {
    const inmueble: Inmueble = {
      id: this.formulario.get('id')?.value,
      pais: this.formulario.get('pais')?.value,
      ciudad: this.formulario.get('ciudad')?.value,
      barrio: this.formulario.get('barrio')?.value,
      metrosCuadrados: this.formulario.get('mtsCuadrados')?.value,
      cantAmbientes: this.formulario.get('cantAmbientes')?.value,
      tipoDeContratacion: this.formulario.get('tipoContratacion')?.value,
      costo: this.formulario.get('costo')?.value,
      estado: this.formulario.get('estado')?.value,
      imgUrl: this.formulario.get('imgUrl')?.value,
      fechaCreacion: "",
      fechaModificacion: "",
      infoAdicional: this.formulario.get('infoAdicional')?.value
    }
    this.inmuebleService.guardar(inmueble).subscribe(
      {
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: e => {
          console.log("Error al guardar" + e);
          this.router.navigate(['/login']).then(() => window.location.reload());
        }
      }
    )

  }

}
