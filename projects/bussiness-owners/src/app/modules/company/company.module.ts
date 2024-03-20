import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './pages/new-company/new-company.component';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AddCompanyComponent } from './pages/add-compny/add-compny.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { LayoutModule } from '../layout/layout.module';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { AddCompanyPopupComponent } from './components/add-company-popup/add-company-popup.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'company/new',
        component: NewCompanyComponent,
      },
      {
        path: 'company/new/:id',
        component: NewCompanyComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ADD_COMPANY,
        },
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
        component: CompaniesListComponent,
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
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [
    NewCompanyComponent,
    CompaniesListComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    AddCompanyPopupComponent
  ],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(routes, {}),
    TreeTableModule,
    TableModule
  
  ],
  exports: [],
})
export class CompanyModule {}