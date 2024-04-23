import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentService, MultiTranslateHttpLoader, SharedLibModule } from 'shared-lib';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CustomStorageService, ERPInterceptor, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { LayoutPageComponent } from './modules/layout/layout-page/layout-page.component';
import { LayoutSidebarComponent } from './modules/layout/layout-sidebar/layout-sidebar.component';
import { LayoutHeaderComponent } from './modules/layout/layout-header/layout-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    LayoutSidebarComponent,
    LayoutHeaderComponent
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
    AppRoutingModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
