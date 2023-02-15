import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country, Name, Translation } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})

export class VerPaisComponent implements OnInit{

  pais!: Country;
  traducciones: Translation[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService  
  ) {}

  ngOnInit(): void {
    /* 
    ngOnInit Es cuando el componente es inicializado.

    A continuación se presenta la forma 1 de trabajar con los obsevables para la petición.
    this.activatedRoute.params
      .subscribe ( ({id}) => {
        this.paisService.buscarCodigo(id)
          .subscribe(pais => {
            console.log(pais);
          }
          )
      }
      );
    */

    this.activatedRoute.params
      // Permite establecer que operadores de rxjs va a usarse con la suscripción.
      .pipe(
        // SwitchMap es uno de los operadores más interesantes.
        switchMap( ( {id} ) => this.paisService.buscarCodigo(id)),
        tap(console.log)
      )
      .subscribe (pais => {
        this.pais = pais[0];
        this.traducciones = Object.values(this.pais.translations);
        console.log(this.pais.translations);
      });
  }

}
