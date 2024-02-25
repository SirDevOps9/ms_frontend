import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  EnvironmentService,
  MultiTranslateHttpLoader,
  SharedLibModule,
} from 'shared-lib';
import { environment } from '../environments/environment';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UserconfirmationComponent } from './pages/inviteduserconfirmation/userconfirmation.component';
import {
  MicrotecAuthLibModule,
  ERPInterceptor,
  CustomStorageService,
} from 'microtec-auth-lib';
import { UserInviteFormComponent } from './components/userscomps/invite-form/user-invite-form/user-invite-form.component';
import { AddCompanyComponent } from './pages/company/add-compny/add-compny.component';
import { CompanyComponent } from './pages/company/company.component';
import { bouserdetails } from './components/userscomps/bouserdetails/bouserdetails.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LayoutComponent,
    UserInviteFormComponent,
    AddCompanyComponent,
    CompanyComponent,
    UserconfirmationComponent,
    bouserdetails
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
    MicrotecAuthLibModule,
    SharedLibModule,
    BrowserAnimationsModule,
    BrowserModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
