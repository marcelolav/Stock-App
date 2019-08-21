import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovimientosService } from 'src/app/services/movimientos.service';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'ang-con-egresos-venta',
  templateUrl: './con-egresos-venta.component.html',
  styleUrls: ['./con-egresos-venta.component.css']
})
export class ConEgresosVentaComponent implements OnInit, OnDestroy {
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
