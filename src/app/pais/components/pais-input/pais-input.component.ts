import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})

export class PaisInputComponent implements OnInit {
  
  @Input() placeholder: string = '';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // Estamos creando un observable de manera manual para indicar cuando el usuario solto una tecla.
  debouncer: Subject<string> = new Subject();

  termino: string = '';
  
  // Se dispara una única vez cuando el componente es creado e inicializado.
  ngOnInit(): void {
    // Para que esto funcione necesitamos colocar un evento al input.
    this.debouncer
    .pipe( debounceTime(300))
    .subscribe( (valor) => {
      // console.log('debouncer:', valor);
      this.onDebounce.emit(valor);
    })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    /*
    Forma alternativa para obtener el valor del input.
    const valor = event.target.value;
    console.log(valor);
    */

    // Se utiliza next para especificar el siguiente valor.
    this.debouncer.next( this.termino );
  }

}
