import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedLibModule } from '../../../shared-lib/src/public-api';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from '../../../shared-lib/src/lib/services/translationHttpLoader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { ERPInterceptor } from '../../../shared-lib/src/lib/interceptors/http.interceptor';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/shared/', suffix: '.json' },
              { prefix: './assets/langs/adminportal/', suffix: '.json' },
            ],
          }),
        deps: [HttpClient],
      },
    }),
    AuthModule.forRoot({
      config: environment.openIdConfig,
    }),
    SharedLibModule.forRoot(environment),
    BrowserAnimationsModule,
    CookieModule.withOptions(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
