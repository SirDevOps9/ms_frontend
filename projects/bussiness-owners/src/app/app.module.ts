import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedLibModule } from '../../../shared-lib/src/public-api';
import { environment } from '../environments/environment';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { MultiTranslateHttpLoader } from '../../../shared-lib/src/lib/services/translationHttpLoader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ERPInterceptor } from '../../../shared-lib/src/lib/interceptors/http.interceptor';
import { CookieModule } from 'ngx-cookie';
import { LayoutComponent } from './compnents/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    SharedLibModule.forRoot(environment),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CookieModule.withOptions()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
