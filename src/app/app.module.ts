import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from "@angular/common/http";
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './shared/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToastsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
