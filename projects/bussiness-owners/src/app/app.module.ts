import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { bouserdetails } from './components/userscomps/bouserdetails/bouserdetails.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PlanComponent } from './pages/Plan/Plan.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewCompanyComponent } from './pages/company/new-company/new-company.component';
import { CompaniesListComponent } from './pages/company/companies-list/companies-list.component';
import { EditCompanyComponent } from './pages/company/edit-company/edit-company.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LayoutComponent,
    UserInviteFormComponent,
    AddCompanyComponent,
    //CompanyComponent,
    UserconfirmationComponent,
    bouserdetails,
    PlanComponent,
    NotFoundComponent,
    NewCompanyComponent,
    CompaniesListComponent,
    MyPlansComponent,
    NotFoundComponent,
    EditCompanyComponent,
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
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    FormsModule,
    DropdownModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    ToggleButtonModule,
    AccordionModule,
    DynamicDialogModule,
    PasswordModule,
    CheckboxModule,
  ],
  providers: [
    DialogService,
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
