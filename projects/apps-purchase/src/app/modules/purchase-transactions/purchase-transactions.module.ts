import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPurchaseInvoiceComponent } from './pages/purchase-invoice/add-purchase-invoice/add-purchase-invoice.component';
import { EditPurchaseInvoiceComponent } from './pages/purchase-invoice/edit-purchase-invoice/edit-purchase-invoice.component';
import { PurchaseInvoiceListComponent } from './pages/purchase-invoice/purchase-invoice-list/purchase-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, Pages, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { MainPurchaseInvoiceComponent } from './pages/purchase-invoice/main-purchase-invoice/main-purchase-invoice.component';
import { ItemAdvancedSearchEditComponent } from './components/item-advanced-search-edit/item-advanced-search-edit.component';
import { TrackingEditComponent } from './components/tracking-edit/tracking-edit.component';
import { PurchaseInvoiceTrackingComponent } from './components/purchase-invoice-tracking/purchase-invoice-tracking.component';
import { ItemAdvancedSearchPurchaseInvoiceComponent } from './components/item-advanced-search-purchase-invoice/item-advanced-search-purchase-invoice.component';
import { ViewInvoiceComponent } from './pages/purchase-invoice/view-invoice/view-invoice.component';
import { AddReturnPurchaseComponent } from './pages/return-purchase-invoice/add-return-purchase/add-return-purchase.component';
import { EditReturnPurchaseComponent } from './pages/return-purchase-invoice/edit-return-purchase/edit-return-purchase.component';
import { MainReturnPurchaseComponent } from './pages/return-purchase-invoice/main-return-purchase/main-return-purchase.component';
import { PurchaseReturnListComponent } from './pages/return-purchase-invoice/purchase-return-list/purchase-return-list.component';
import { PurchaseReturnViewComponent } from './pages/return-purchase-invoice/purchase-return-view/purchase-return-view.component';

import { AuthGuard } from 'microtec-auth-lib';

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
            path: 'add',
            component: AddPurchaseInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceAdd,
              pageTitle: BreadcrumbLabel.purchaseInvoiceAdd,
            },
          },
          {
            path: 'edit/:id',
            component: EditPurchaseInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PURCHASE_EDIT,
              pageTitle: BreadcrumbLabel.TITLE_PURCHASE_EDIT,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Purchase,
              pageId: Pages.PurchaseInvoice,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,
            },
          },
          {
            path: 'view/:id',
            component: ViewInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceView,
              pageTitle: BreadcrumbLabel.purchaseInvoiceView,
            },
          },
        ],
      },
      {
        path: 'return-purchase',
        component: MainReturnPurchaseComponent,
        data: {
          breadcrumb: BreadcrumbLabel.purchaseInvoiceReturnList,
          pageTitle: BreadcrumbLabel.purchaseInvoiceReturnList,
        },
        children: [
          {
            path: '',
            component: PurchaseReturnListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add',
            component: AddReturnPurchaseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceAdd,
              pageTitle: BreadcrumbLabel.purchaseInvoiceAdd,
            },
          },
          {
            path: 'edit/:id',
            component: EditReturnPurchaseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PURCHASE_EDIT,
              pageTitle: BreadcrumbLabel.TITLE_PURCHASE_EDIT,
            },
          },
          {
            path: 'view/:id',
            component: PurchaseReturnViewComponent,
            data: {
              breadcrumb: BreadcrumbLabel.purchaseInvoiceView,
              pageTitle: BreadcrumbLabel.purchaseInvoiceView,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Purchase,
              pageId: Pages.PurchaseReturnInvoice,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,
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
    ItemAdvancedSearchEditComponent,
    TrackingEditComponent,
    PurchaseInvoiceTrackingComponent,
    ItemAdvancedSearchPurchaseInvoiceComponent,
    ViewInvoiceComponent,
    AddReturnPurchaseComponent,
    EditReturnPurchaseComponent,
    MainReturnPurchaseComponent,
    PurchaseReturnListComponent,
    PurchaseReturnViewComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class PurchaseTransactionsModule {}
