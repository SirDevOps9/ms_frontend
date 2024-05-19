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

const routes: Routes = [
  {
    path: '', component: BussinessOwnersListComponent
    
  },
  // , canActivate: [AuthGuard]
  { path: 'manage', component: EditBussinessOwnerComponent },
  { path: 'domain-space-info', component: DomainSpaceInfoComponent },
  { path: 'companies-details-info', component: CompaniesDetailsInfoComponent },
  { path: 'user-info', component: UserInfoListComponent },
  { path: 'licence-info', component: LicenceInfoListComponent },
  { path: 'apps-info', component: AppInfoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOwnerRoutingModule { }
