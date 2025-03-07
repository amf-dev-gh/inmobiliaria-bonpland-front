import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http:HttpClient) { }

  obtenerPaises(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl+'/all').pipe(
      map(paises =>
        paises
          .filter(pais => pais.translations?.spa?.common) // Filtra los que tienen nombre en español
          .map(pais => pais.translations.spa.common) // Extrae el nombre en español
          .sort() // Ordena alfabéticamente
      )
    );
  }
}
