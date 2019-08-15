import { Component } from '@angular/core';

@Component({
  selector: 'ang-modulo-pruebas',
  templateUrl: './modulo-pruebas.component.html'  ,
  styleUrls: ['./modulo-pruebas.component.css']
})
export class ModuloPruebasComponent {
  // Determino tipo
  masculino = 20;
  femenino = 27;
  empresa = 30;
  documento = '';

  constructor() { 
    const vartesting = 'Testeo de modulos';
  }

}
