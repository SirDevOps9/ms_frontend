import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessOwnersListComponent } from './pages/bussiness-owners-list/bussiness-owners-list.component';
import { EditBussinessOwnerComponent } from './pages/edit-bussiness-owner/edit-bussiness-owner.component';
import { DomainSpaceInfoComponent } from './pages/domain-space-info/domain-space-info.component';
import { CompaniesDetailsInfoComponent } from './pages/companies-details-info/companies-details-info.component';
import { AuthGuard } from 'microtec-auth-lib';
import { UserInfoListComponent } from './pages/user-info-list/user-info-list.component';
import { LicenceInfoListComponent } from './pages/licence-info-list/licence-info-list.component';
import { AppInfoListComponent } from './pages/app-info-list/app-info-list.component';
import { BreadcrumbLabel } from 'shared-lib';
import { AddBussinessOwnerComponent } from './pages/add-bussiness-owner/add-bussiness-owner.component';
import { AddInvoiceComponent } from './pages/add-invoice/add-invoice.component';
import { BreadCrumbRoute } from './models';

const routes: Routes = [
  {
    path: '', component: BussinessOwnersListComponent,
    data : {
      breadcrumb: BreadCrumbRoute.bussinesOwner

    }
    
  },
  // , canActivate: [AuthGuard]
  { path: 'manage/:id', component: EditBussinessOwnerComponent,
    data : {
      breadcrumb: BreadcrumbLabel.MANAGE_BUSSINESS_OWNER,

    } },
  { path: 'domain-space-info/:id', component: DomainSpaceInfoComponent ,
  data : {
    breadcrumb: BreadcrumbLabel.SUBDOMAIN_INFO,

  } 
  },
  { path: 'companies-details-info/:id', component: CompaniesDetailsInfoComponent ,  data : {
    breadcrumb: BreadcrumbLabel.COMPANIES_INFO,

  }  },
  { path: 'user-info/:id', component: UserInfoListComponent ,  data : {
    breadcrumb: BreadcrumbLabel.USER_INFO,

  }},
  { path: 'licence-info/:id', component: LicenceInfoListComponent ,  data : {
    breadcrumb: BreadcrumbLabel.LICENCE_INFO,

  }},
  { path: 'apps-info/:id', component: AppInfoListComponent ,  data : {
    breadcrumb: BreadcrumbLabel.APP_INFO,

  }},
  { path: 'add', 
    component: AddBussinessOwnerComponent ,
      data : {
        breadcrumb: BreadCrumbRoute.addBussinesOwner

  }},
  { path: 'add-invoice', 
    component: AddInvoiceComponent ,
      data : {
        breadcrumb: BreadCrumbRoute.addInvoice

  }},
  { path: 'add-invoice/:id', 
    component: AddInvoiceComponent ,
      data : {
        breadcrumb: BreadCrumbRoute.addInvoice

  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOwnerRoutingModule { }
