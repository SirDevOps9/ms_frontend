import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseInvoiceComponent } from './pages/purchase-invoice/add-purchase-invoice/add-purchase-invoice.component';
import { EditPurchaseInvoiceComponent } from './pages/purchase-invoice/edit-purchase-invoice/edit-purchase-invoice.component';
import { PurchaseInvoiceListComponent } from './pages/purchase-invoice/purchase-invoice-list/purchase-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { MainPurchaseInvoiceComponent } from './pages/purchase-invoice/main-purchase-invoice/main-purchase-invoice.component';
import { VendorAavancedSearchComponent } from './components/vendor-aavanced-search/vendor-aavanced-search.component';
import { VendorPurchasingAdvancedSearchComponent } from './components/vendor-purchasing-advanced-search/vendor-purchasing-advanced-search.component';
import { PurchaseInvoiceTrackingComponent } from './components/purchase-invoice-tracking/purchase-invoice-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Purchase,
    },
    children: [
      {
        path: 'purchase-invoice',
        component: MainPurchaseInvoiceComponent,
        data: {
          breadcrumb: BreadcrumbLabel.purchaseInvoiceList,
          pageTitle: BreadcrumbLabel.purchaseInvoiceList,
        },
        children:[
          {
            path: '',
            component: PurchaseInvoiceListComponent,
            data: {
              breadcrumb: '',

            },
          },
          {
            path: 'add-purchase-invoice',
            component: AddPurchaseInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceAdd,
              pageTitle: BreadcrumbLabel.purchaseInvoiceAdd,


            },
          },
          {
            path: 'edit',
            component: EditPurchaseInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PURCHASE_EDIT,
              pageTitle: BreadcrumbLabel.TITLE_PURCHASE_EDIT,


            },
          },
         
        ]
      },
    
    ],
  },
];

@NgModule({
  declarations: [
    AddPurchaseInvoiceComponent,
    EditPurchaseInvoiceComponent,
    PurchaseInvoiceListComponent,
    MainPurchaseInvoiceComponent,
    VendorAavancedSearchComponent,
    VendorPurchasingAdvancedSearchComponent,
    PurchaseInvoiceTrackingComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],

})
export class PurchaseTransactionsModule { }
