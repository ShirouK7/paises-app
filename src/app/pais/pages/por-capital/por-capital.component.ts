import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})

export class PorCapitalComponent {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService:PaisService) { }

  buscar(termino: string) {

    this.isError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino)
      .subscribe(
        (paises) => {
          this.paises = paises;
        },
        (error) => {
          this.isError = true;
          this.paises = [];
        }
      )

  }

  sugerencias(termino: string) {
    this.isError = false;
    // TODO: Crear sugerencias.
  }

}
