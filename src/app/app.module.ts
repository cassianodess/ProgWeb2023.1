import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideButtonComponent } from './shared/side-button/side-button.component';
import { HttpClientModule } from "@angular/common/http";
import { LoadingComponent } from './shared/loading/loading.component'

@NgModule({
  declarations: [
    AppComponent,
    SideButtonComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
