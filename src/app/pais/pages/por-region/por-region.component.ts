import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `
  ]
})
export class PorRegionComponent {
  
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  regionActiva: string = '';

  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  getClaseCSS ( region: string ): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion(region: string) {
    this.regionActiva = region;

    this.isError = false;
    this.termino = region;

    this.paisService.buscarRegion(region)
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
