import { Component, OnInit } from '@angular/core';
import { Inmueble } from '../../interfaces/inmueble.interface';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  form: FormGroup;
  tituloModal: string = "";
  cuerpoModal: string = "";
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
  }

  ngOnInit(): void {
    this.obtenerInmueble();
  }


  constructor(private inmuebleService: InmuebleService, private ruta: ActivatedRoute, private router: Router, private utilService: UtilidadesService, private fb: FormBuilder) {
    this.form = fb.group({
      nombreCompleto: ['', Validators.required],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required]
    });
  }


  obtenerInmueble() {
    const id = this.ruta.snapshot.paramMap.get("id");
    this.inmuebleService.obtenerInmueblePorID(id).subscribe(
      {
        next: i => this.inmueble = i,
        error: e => {
          console.error("No existe inmueble con el id indicado", e);
          alert("El inmueble indicado no existe.")
          this.router.navigate(['/buscar']);
        }
      }
    )
  }

  reservaConsulta(tipo: string) {
    this.tituloModal = tipo;
  }

  enviar() {
    const confirma = confirm(`Se enviará un mail a ${this.form.get('email')?.value} para confirmar su ${this.tituloModal.toLocaleLowerCase()}. ¿Es correcto?`);
    if (confirma) {
      alert(`${this.tituloModal} inmueble: ${this.inmueble.id}`)
      //SERVICIO QUE GENERA CONSULTA O SOLICITUD RESERVA
      this.router.navigate(['/buscar'])
    }
  }

  limpiarFormulario() {
    this.form.patchValue({
      nombreCompleto: '',
      telefono: '',
      dni: '',
      email: ''
    });
  }

  obtenerColor(estado: string) {
    return this.utilService.obtenerColorTexto(estado);
  }
}
