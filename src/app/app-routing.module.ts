import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { HomeComponent } from './components/home/home.component';
import { AbmProductosComponent } from './components/abm-productos/abm-productos.component';
import { AbmRubrosComponent } from './components/abm-rubros/abm-rubros.component';
import { Page404Component } from './components/page404/page404.component';
import { AbmProveedoresComponent } from './components/abm-proveedores/abm-proveedores.component';
import { AbmClientesComponent } from './components/abm-clientes/abm-clientes.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'abmproductos', component: AbmProductosComponent },
  { path: 'abmrubros', component: AbmRubrosComponent },
  { path: 'abmproveedores', component: AbmProveedoresComponent },
  { path: 'abmclientes', component: AbmClientesComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
