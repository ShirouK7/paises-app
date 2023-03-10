import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})

export class PorPaisComponent {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: Boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe( 
      (paises) => {
        // console.log(paises);
        this.paises = paises;
      },
      (error) => {
        this.isError = true;
        // console.log(error);
        this.paises = [];
      }
      )
    // this.termino = '';
  }

  sugerencias(termino: string) {
    this.isError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais(termino)
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,3),
        (error) => this.paisesSugeridos = []
      );

  }

  buscarSugerido(termino: string) {
    this.buscar(this.termino);
  }

}
