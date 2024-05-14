import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessOwnersListComponent } from './pages/bussiness-owners-list/bussiness-owners-list.component';
import { EditBussinessOwnerComponent } from './pages/edit-bussiness-owner/edit-bussiness-owner.component';
import { DomainSpaceInfoComponent } from './pages/domain-space-info/domain-space-info.component';
import { CompaniesDetailsInfoComponent } from './pages/companies-details-info/companies-details-info.component';

const routes: Routes = [
  {path : '' , component : BussinessOwnersListComponent},
  {path : 'manage' , component : EditBussinessOwnerComponent},
  {path : 'domain-space-info' , component : DomainSpaceInfoComponent},
  {path : 'companies-details-info' , component : CompaniesDetailsInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOwnerRoutingModule { }
