import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedLibModule } from '../../../shared-lib/src/public-api';
import { environment } from '../environments/environment';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { MultiTranslateHttpLoader } from '../../../shared-lib/src/lib/services/translationHttpLoader';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';
import {
  MicrotecAuthLibModule,
  ERPInterceptor,
  CustomStorageService,
} from 'microtec-auth-lib';
import { UserInviteFormComponent } from './components/userscomps/invite-form/user-invite-form/user-invite-form.component';
import { AddCompanyComponent } from './pages/company/add-compny/add-compny.component';
import { CompanyComponent } from './pages/company/company.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LayoutComponent,
    UserInviteFormComponent,
    AddCompanyComponent,
    CompanyComponent,
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
    SharedLibModule.forRoot(environment),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CookieModule.withOptions(),
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    FormsModule,
    DropdownModule
  ],
  providers: [
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
