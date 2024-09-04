import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlSerializer } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppsSharedLibModule } from 'apps-shared-lib';
import { MicrotecAuthLibModule, ERPInterceptor } from 'microtec-auth-lib';
import { CookieModule } from 'ngx-cookie';
import {
  MultiTranslateHttpLoader,
  SharedLibModule,
  EnvironmentService,
  LowerCaseUrlSerializer,
} from 'shared-lib';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/accounting/', suffix: '.json' },
              { prefix: './assets/langs/erphome/', suffix: '.json' },
              { prefix: './assets/langs/finance/', suffix: '.json' },
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
    AppRoutingModule,
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
