import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppsSharedLibModule } from 'apps-shared-lib';
import { MicrotecAuthLibModule, ERPInterceptor } from 'microtec-auth-lib';
import { CookieModule } from 'ngx-cookie';
import { MultiTranslateHttpLoader, SharedLibModule, EnvironmentService, LowerCaseUrlSerializer } from 'shared-lib';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/auth/', suffix: '.json' },
              { prefix: './assets/langs/inventory/', suffix: '.json' },
              { prefix: './assets/langs/shared/', suffix: '.json' },
            ],
          }),
        deps: [HttpClient],
      },
    }),
    SharedLibModule,
    MicrotecAuthLibModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
