// componentes del nucleo angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Rutas
import { AppRoutingModule } from './app-routing.module';
// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
// Configuracion de entorno (Vea README.MD)
import { environment } from '../environments/environment';
// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// ngx-filter-pipe
import { FilterPipeModule } from 'ngx-filter-pipe';
// Font Awesome para angular
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
import { ConIngresosComponent } from './components/con-ingresos/con-ingresos.component';
import { ConEgresosVentaComponent } from './components/con-egresos-venta/con-egresos-venta.component';
import { ConEgresosStockComponent } from './components/con-egresos-stock/con-egresos-stock.component';
import { ConMovimientosComponent } from './components/con-movimientos/con-movimientos.component';
import { ConListaPreciosComponent } from './components/con-lista-precios/con-lista-precios.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AbmProductosComponent,
    AbmRubrosComponent,
    Page404Component,
    AbmProveedoresComponent,
    AbmClientesComponent,
    ModuloPruebasComponent,
    IngresosComponent,
    EgresoStockComponent,
    EgresoVentasComponent,
    ConIngresosComponent,
    ConEgresosVentaComponent,
    ConEgresosStockComponent,
    ConMovimientosComponent,
    ConListaPreciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularFontAwesomeModule,
    FilterPipeModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
