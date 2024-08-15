import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component/app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  EnvironmentService,
  LowerCaseUrlSerializer,
  MultiTranslateHttpLoader,
  SharedLibModule,
} from 'shared-lib';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { MicrotecAuthLibModule, ERPInterceptor } from 'microtec-auth-lib';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ERPUserModule } from './modules/erp-user/erp-user.module';
import { AppStoreModule } from './modules/app-store/app-store.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UrlSerializer } from '@angular/router';
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MicrotecAuthLibModule,
    SharedLibModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CookieModule.withOptions(),
    LayoutModule,
    CompanyModule,
    SubscriptionModule,
    UserModule,
    ERPUserModule,
    AppStoreModule,
  ],
  providers: [
    { provide: EnvironmentService, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    },
    // {
    //   provide: UrlSerializer,
    //   useClass: LowerCaseUrlSerializer,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
