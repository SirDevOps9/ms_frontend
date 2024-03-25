import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AddCompanyComponent } from './pages/add-compny/add-compny.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { CompaniesListComponent } from './pages/companies-list/companies-list.component';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { LayoutModule } from '../layout/layout.module';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { CompanyAddresComponent } from './pages/company-addres/company-addres.component';
import { CompanyLegalComponent } from './pages/company-legal/company-legal.component';
import { CompanyContactComponent } from './pages/company-contact/company-contact.component';
import { CompanyHierarchyComponent } from './pages/company-hierarchy/company-hierarchy.component';
import { CompanyBranchesComponent } from './pages/company-branches/company-branches.component';
import { NewBranchesComponent } from './components/new-branches/new-branches.component';
import { EditBranchesComponent } from './components/edit-branches/edit-branches.component'
import { NewCompanyComponent } from './components/new-company/new-company.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

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
        children: [
          {
            path: '',
            component: CompanyAddresComponent,
          },
          {
            path: 'address',
            component: CompanyAddresComponent,
          },
          {
            path: 'legal',
            component: CompanyLegalComponent,
          },
          {
            path: 'contact',
            component: CompanyContactComponent,
          },
          {
            path: 'hierarchy',
            component: CompanyHierarchyComponent,
          },
          {
            path: 'branches',
            component: CompanyBranchesComponent,
          }
        ]
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
    CompanyAddresComponent,
    CompanyLegalComponent,
    CompanyContactComponent,
    CompanyHierarchyComponent,
    CompanyBranchesComponent,
    NewBranchesComponent,
    EditBranchesComponent
  ],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(routes, {}),
    TreeTableModule,
    TableModule,
    
  
  ],
  exports: [],
})
export class CompanyModule {}
