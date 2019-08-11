import { Component, OnInit } from '@angular/core';
import { RubrosService } from 'src/app/services/rubros.service';
import { Rubro } from 'src/app/interfaces/rubro';

@Component({
  selector: 'ang-abm-rubros',
  templateUrl: './abm-rubros.component.html',
  styleUrls: ['./abm-rubros.component.css']
})
export class AbmRubrosComponent implements OnInit {

  constructor( 
    private rubSer: RubrosService
  ) { }

  rubros = [];
  regRubro = {} as Rubro;

  ngOnInit() {
    this.rubSer.getRubros()
      .subscribe(res => { this.rubros = res; });
  }

  agregaRubro(rubro: Rubro) {
    this.rubSer.addRubro(rubro);
    this.regRubro = {} as Rubro;
  }


}
