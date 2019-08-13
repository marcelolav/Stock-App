import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ang-modulo-cuit',
  templateUrl: './modulo-cuit.component.html',
  styleUrls: ['./modulo-cuit.component.css']
})
export class ModuloCuitComponent {
  // Determino tipo
  masculino = 20;
  femenino = 27;
  empresa = 30;
  documento = '';
  

  constructor() { }

}
