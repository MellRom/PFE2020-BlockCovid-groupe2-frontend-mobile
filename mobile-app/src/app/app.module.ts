import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NgQrScannerModule } from 'angular2-qrscanner'
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {WebSocketService} from "./services/webSocketService/web-socket-service.service";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgQrScannerModule,
    HttpClientModule,
    ServiceWorkerModule.register('service-worker.js', { enabled: environment.production })
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
