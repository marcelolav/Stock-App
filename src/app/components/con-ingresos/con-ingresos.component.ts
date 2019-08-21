import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovimientosService } from 'src/app/services/movimientos.service';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'ang-con-ingresos',
  templateUrl: './con-ingresos.component.html',
  styleUrls: ['./con-ingresos.component.css']
})
export class ConIngresosComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  movimientos = [];
  constructor(private movSer: MovimientosService) { 
    this.movSer.getMovimientos()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(res => { this.movimientos = res; });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
