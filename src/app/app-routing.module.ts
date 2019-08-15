import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { HomeComponent } from './components/home/home.component';
import { AbmProductosComponent } from './components/abm-productos/abm-productos.component';
import { AbmRubrosComponent } from './components/abm-rubros/abm-rubros.component';
import { Page404Component } from './components/page404/page404.component';
import { AbmProveedoresComponent } from './components/abm-proveedores/abm-proveedores.component';
import { AbmClientesComponent } from './components/abm-clientes/abm-clientes.component';
import { ModuloPruebasComponent } from './components/modulo-pruebas/modulo-pruebas.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { EgresoStockComponent } from './components/egreso-stock/egreso-stock.component';
import { EgresoVentasComponent } from './components/egreso-ventas/egreso-ventas.component';
import { ConMovimientosComponent } from './components/con-movimientos/con-movimientos.component';
import { ConIngresosComponent } from './components/con-ingresos/con-ingresos.component';
import { ConEgresosVentaComponent } from './components/con-egresos-venta/con-egresos-venta.component';
import { ConEgresosStockComponent } from './components/con-egresos-stock/con-egresos-stock.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'abmproductos', component: AbmProductosComponent },
  { path: 'abmrubros', component: AbmRubrosComponent },
  { path: 'abmproveedores', component: AbmProveedoresComponent },
  { path: 'abmclientes', component: AbmClientesComponent },
  { path: 'probarModulo', component: ModuloPruebasComponent },
  { path: 'ingreso', component: IngresosComponent },
  { path: 'egresoStock', component: EgresoStockComponent },
  { path: 'egresoVentas', component: EgresoVentasComponent },
  { path: 'conMovimientos', component: ConMovimientosComponent },
  { path: 'conIngresos', component: ConIngresosComponent },
  { path: 'conEgresosVenta', component: ConEgresosVentaComponent },
  { path: 'conEgresosStock', component: ConEgresosStockComponent},
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
