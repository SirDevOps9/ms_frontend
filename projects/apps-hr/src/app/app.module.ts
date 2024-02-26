import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MicrotecAuthLibModule } from 'microtec-auth-lib';
import { SharedLibModule } from 'shared-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule,
    MicrotecAuthLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
