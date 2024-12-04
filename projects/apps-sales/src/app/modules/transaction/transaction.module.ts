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
        children:[
          {
            path: '',
            component: SalesInvoiceComponent,
            data: {
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.SALES_INVOICE_LIST,
            }
          },
          {
            path: 'add',
            component: AddSalesInvoiceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_INVOICE_ADD,
              pageTitle:BreadcrumbLabel.SALES_INVOICE_ADD,
            }
          },
         
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Sales,
              pageId: Pages.PricePolicy,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE
            },
          },
        ]
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

  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule 
  ],
})
export class TransactionModule { }
