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
import { ModuloCuitComponent } from './components/modulo-cuit/modulo-cuit.component';
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
    ModuloCuitComponent
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
    AngularFontAwesomeModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
