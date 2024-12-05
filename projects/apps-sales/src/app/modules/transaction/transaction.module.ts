import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, Pages, SharedLibModule } from 'shared-lib';
import { AddSalesInvoiceComponent } from './pages/sales-invoices/add-sales-invoice/add-sales-invoice.component';
import { MainSalesInvoiceComponent } from './pages/sales-invoices/main-sales-invoice/main-sales-invoice.component';
import { SalesInvoiceComponent } from './pages/sales-invoices/sales-invoice-list/sales-invoice.component';
import { ItemAdvancedSearchSalesInvoiceComponentComponent } from './components/item-advanced-search-sales-invoice-component/item-advanced-search-sales-invoice-component.component';
import { SalesInvoiceTrackingComponentComponent } from './components/sales-invoice-tracking-component/sales-invoice-tracking-component.component';
import { EditSalesInvoiceComponent } from './pages/sales-invoices/edit-sales-invoice/edit-sales-invoice.component';
import { ViewSalesComponent } from './pages/sales-invoices/view-sales/view-sales.component';
import { MainSalesReturnInvoiceComponent } from './pages/return-sales-invoice/main-sales-return-invoice/main-sales-return-invoice.component';
import { ListSalesReturnInvoiceComponent } from './pages/return-sales-invoice/list-sales-return-invoice/list-sales-return-invoice.component';
import { AddSalesReturnInvoiceComponent } from './pages/return-sales-invoice/add-sales-return-invoice/add-sales-return-invoice.component';
import { EditSalesReturnInvoiceComponent } from './pages/return-sales-invoice/edit-sales-return-invoice/edit-sales-return-invoice.component';
import { ViewSalesReturnInvoiceComponent } from './pages/return-sales-invoice/view-sales-return-invoice/view-sales-return-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      {
        path: 'sales-invoice',
        component: MainSalesInvoiceComponent,
        data: {
          breadcrumb: BreadcrumbLabel.SALES_INVOICE_LIST,
          pageTitle: BreadcrumbLabel.SALES_INVOICE_LIST,
        },
        children: [
          {
            path: '',
            component: SalesInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_INVOICE_LIST_VIEW,
              pageTitle: BreadcrumbLabel.SALES_INVOICE_LIST,
            },
          },
          {
            path: 'sales-invoice-view',
            component: ViewSalesComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_INVOICE_VIEW,
              pageTitle: BreadcrumbLabel.SALES_INVOICE_VIEW,
            },
          },
          {
            path: 'add',
            component: AddSalesInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_INVOICE_ADD,
              pageTitle: BreadcrumbLabel.SALES_INVOICE_ADD,
            },
          },

          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Sales,
              pageId: Pages.PricePolicy,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,
            },
          },
        ],
      },
      {
        path: 'sales-return-invoice',
        component: MainSalesReturnInvoiceComponent,
        data: {
          pageTitle: BreadcrumbLabel.SALES_RETURN_INVOICE,
        },
        children: [
          {
            path: '',
            component: ListSalesReturnInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_RETURN_INVOICE_LIST,
              pageTitle: BreadcrumbLabel.SALES_RETURN_INVOICE,
            },
          },
          {
            path: 'view',
            component: ViewSalesReturnInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_RETURN_INVOICE_VIEW,
              pageTitle: BreadcrumbLabel.SALES_RETURN_INVOICE,
            },
          },
          {
            path: 'add',
            component: AddSalesReturnInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_RETURN_INVOICE_ADD,
              pageTitle: BreadcrumbLabel.SALES_RETURN_INVOICE,
            },
          },
          {
            path: 'edit/:id',
            component: AddSalesReturnInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_RETURN_INVOICE_EDIT,
              pageTitle: BreadcrumbLabel.SALES_RETURN_INVOICE,
            },
          },

          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Sales,
              pageId: Pages.PricePolicy,
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
    MainSalesInvoiceComponent,
    SalesInvoiceComponent,
    AddSalesInvoiceComponent,
    ItemAdvancedSearchSalesInvoiceComponentComponent,
    SalesInvoiceTrackingComponentComponent,
    EditSalesInvoiceComponent,
    ViewSalesComponent,
    MainSalesReturnInvoiceComponent,
    ListSalesReturnInvoiceComponent,
    AddSalesReturnInvoiceComponent,
    EditSalesReturnInvoiceComponent,
    ViewSalesReturnInvoiceComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class TransactionModule {}
