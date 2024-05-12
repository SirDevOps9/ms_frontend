import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinessOwnersListComponent } from './pages/bussiness-owners-list/bussiness-owners-list.component';
import { EditBussinessOwnerComponent } from './pages/edit-bussiness-owner/edit-bussiness-owner.component';

const routes: Routes = [
  {path : '' , component : BussinessOwnersListComponent},
  {path : 'manage' , component : EditBussinessOwnerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOwnerRoutingModule { }
