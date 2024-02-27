import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  EnvironmentService,
  MultiTranslateHttpLoader,
  SharedLibModule,
} from 'shared-lib';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  CustomStorageService,
  ERPInterceptor,
  MicrotecAuthLibModule,
} from 'microtec-auth-lib';
import { CookieModule } from 'ngx-cookie';
import { TreasuryModule } from './treasury/treasury.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreasuryModule,
    AuthModule.forRoot({
      config: environment.openIdConfig,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/auth/', suffix: '.json' },
              { prefix: './assets/langs/bussiness-owners/', suffix: '.json' },
            ],
          }),
        deps: [HttpClient],
      },
    }),
    SharedLibModule,
    MicrotecAuthLibModule,
    CookieModule.withOptions(),
  ],
  providers: [
    { provide: EnvironmentService, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    },
    { provide: AbstractSecurityStorage, useClass: CustomStorageService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
