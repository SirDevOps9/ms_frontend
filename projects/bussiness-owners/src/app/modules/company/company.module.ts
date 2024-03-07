import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AddCompanyComponent } from './pages/add-compny/add-compny.component';
import { CompanyComponent } from '../../pages/company/company/company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';

const routes: Routes = [
  {
    path: 'company/new',
    component: NewCompanyComponent,
  },
  {
    path: 'company/new/:id',
    component: NewCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'company/add/:id',
    component: AddCompanyComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: BreadcrumbLabel.ADD_COMPANY,
    },
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: BreadcrumbLabel.COMPANY_LIST,
    },
  },
  {
    path: 'company/edit/:id',
    component: EditCompanyComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  providers: [],
  declarations: [NewCompanyComponent],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [],
})
export class CompanyModule {}
