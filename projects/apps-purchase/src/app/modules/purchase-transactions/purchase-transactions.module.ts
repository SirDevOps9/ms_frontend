import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseInvoiceComponent } from './pages/purchase-invoice/add-purchase-invoice/add-purchase-invoice.component';
import { EditPurchaseInvoiceComponent } from './pages/purchase-invoice/edit-purchase-invoice/edit-purchase-invoice.component';
import { PurchaseInvoiceListComponent } from './pages/purchase-invoice/purchase-invoice-list/purchase-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { MainPurchaseInvoiceComponent } from './pages/purchase-invoice/main-purchase-invoice/main-purchase-invoice.component';
import { ViewInvoiceComponent } from './pages/purchase-invoice/view-invoice/view-invoice.component';

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
        children: [
          {
            path: '',
            component: PurchaseInvoiceListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'Add-purchase-invoice',
            component: AddPurchaseInvoiceComponent,
            data: {
              breadcrumb: 'BreadcrumbLabel.purchaseInvoiceAdd',
              pageTitle: BreadcrumbLabel.purchaseInvoiceAdd,
            },
          },
          {
            path: 'Edit-purchase-invoice/:id',
            component: EditPurchaseInvoiceComponent,
            data: {
              breadcrumb: 'BreadcrumbLabel.purchaseInvoiceEdit',
              pageTitle: BreadcrumbLabel.purchaseInvoiceEdit,
            },
          },
          {
            path: 'view-purchase-invoice/:id',
            component: ViewInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceView,
              pageTitle: BreadcrumbLabel.purchaseInvoiceView,
            },
          },
        ],
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
    ViewInvoiceComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class PurchaseTransactionsModule {}
