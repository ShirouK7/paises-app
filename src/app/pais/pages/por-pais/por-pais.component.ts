import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})

export class PorPaisComponent {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
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
    // TODO: Crear sugerencias.
  }

}
