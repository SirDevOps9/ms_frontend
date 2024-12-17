import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOwnerRoutingModule } from './business-owner-routing.module';
import { AddBussinessOwnerComponent } from './pages/add-bussiness-owner/add-bussiness-owner.component';
import { SharedLibModule } from "../../../../../../libs/shared-lib/src/lib/shared-lib.module";
import { AddInvoiceComponent } from './pages/add-invoice/add-invoice.component';


@NgModule({
  declarations: [ 
    AddBussinessOwnerComponent, AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    BusinessOwnerRoutingModule,
    SharedLibModule
]
})
export class BusinessOwnerModule { }
