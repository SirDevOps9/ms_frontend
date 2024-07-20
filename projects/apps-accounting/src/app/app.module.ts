import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  EnvironmentService,
  LowerCaseUrlSerializer,
  MultiTranslateHttpLoader,
  SharedLibModule,
} from 'shared-lib';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ERPInterceptor, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { CookieModule } from 'ngx-cookie';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppsSharedLibModule } from 'apps-shared-lib';
import { UrlSerializer } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/accounting/', suffix: '.json' },
              { prefix: './assets/langs/erphome/', suffix: '.json' },
            ],
          }),
        deps: [HttpClient],
      },
    }),
    MicrotecAuthLibModule,
    SharedLibModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CookieModule.withOptions(),
    AppsSharedLibModule,
  ],
  providers: [
    { provide: EnvironmentService, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    },
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
