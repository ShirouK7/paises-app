import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,alpha3Code,flag,population');
  } 

  private apiUrl: string = 'https://restcountries.com/v3.1'; 

  constructor(private http:HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    // return this.http.get<Country[]>(url, {params: this.httpParams}); para hacer el filtrado.
    return this.http.get<Country[]>(url);
    /* Forma 2 del manejo de errores.
      .pipe(
        //  El of es una función que regresa observables.
        catchError(error => of(['Hola Mundo']))
      );
    */
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url);
  }

  buscarRegion(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${termino}`;
    return this.http.get<Country[]>(url)
      .pipe(
        tap (console.log)
      )
  }

  buscarCodigo(id: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }

}


