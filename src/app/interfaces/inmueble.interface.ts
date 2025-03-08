export interface Inmueble {

  id: string | null,
  pais: string,
  ciudad: string,
  barrio: string,
  metrosCuadrados: number,
  cantAmbientes: number,
  tipoDeContratacion: string,
  costo: number,
  estado: string,
  imgUrl: string,
  fechaCreacion: string,
  fechaModificacion: string,
  infoAdicional: string
}
