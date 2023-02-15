import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarRegion(termino)
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
