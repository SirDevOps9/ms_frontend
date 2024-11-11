import { Pages } from './../../../../../../libs/shared-lib/src/lib/models/pages';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentInComponent } from './pages/paymentin/add-payment-in/add-payment-in.component';
import { EditPaymentInComponent } from './pages/paymentin/edit-payment-in/edit-payment-in.component';
import { ViewPaymentInComponent } from './pages/paymentin/view-payment-in/view-payment-in.component';
import { PaymentInListComponent } from './pages/paymentin/payment-in-list/payment-in-list.component';
import { MainPaymentInComponent } from './pages/paymentin/main-payment-in/main-payment-in.component';
import { AddCostCenterComponent } from './components/paymentin/add-cost-center/add-cost-center.component';
import { PaymentMethodComponent } from './components/paymentin/payment-method/payment-method.component';
import { PopupAccountsComponent } from './components/paymentin/popup-accounts/popup-accounts.component';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { AddPaymentOutComponent } from './pages/paymentout/add-payment-out/add-payment-out.component';
import { EditPaymentOutComponent } from './pages/paymentout/edit-payment-out/edit-payment-out.component';
import { ViewPaymentOutComponent } from './pages/paymentout/view-payment-out/view-payment-out.component';
import { MainPaymentOutComponent } from './pages/paymentout/main-payment-out/main-payment-out.component';
import { PaymentOutListComponent } from './pages/paymentout/payment-out-list/payment-out-list.component';
import { AddPaymentOutCostCenterComponent } from './components/paymentout/add-payment-out-cost-center/add-payment-out-cost-center.component';
import { PaymentOutPaymentMethodComponent } from './components/paymentout/payment-out-payment-method/payment-out-payment-method.component';
import { ReadExcelComponent } from './pages/read-excel/read-excel.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: 'sequence/:page',
        component: SequenceComponent,
        data: {
          moduleId: Modules.Finance,
          pageId: Pages.paymenitIn,
        },
      },
      {
        path: 'paymentin',
        component: MainPaymentInComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_IN,
        },
        children: [
          {
            path: '',
            component: PaymentInListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_IN_LIST,
              pageTitle: BreadcrumbLabel.PAYMENT_IN_LIST,
            },
          },
          {
            path: 'add',
            component: AddPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_PAYMENT_IN,
              pageTitle: BreadcrumbLabel.ADD_PAYMENT_IN,
            },
          },
          {
            path: 'edit/:id',
            component: EditPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_PAYMENT_IN,
              pageTitle: BreadcrumbLabel.EDIT_PAYMENT_IN,
            },
          },
          {
            path: 'view/:id',
            component: ViewPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_PAYMENT_IN,
              pageTitle: BreadcrumbLabel.VIEW_PAYMENT_IN,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Finance,
              pageId: Pages.paymenitIn,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE
            },
          },
        ],
      },
      {
        path: 'paymentout',
        component: MainPaymentOutComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_OUT,
          pageTitle: BreadcrumbLabel.PAYMENT_OUT,

        },
        children: [
          {
            path: '',
            component: PaymentOutListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_OUT_LIST,
              pageTitle: BreadcrumbLabel.PAYMENT_OUT_LIST,
            },
          },
          {
            path: 'add',
            component: AddPaymentOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_PAYMENT_OUT,
              pageTitle: BreadcrumbLabel.ADD_PAYMENT_OUT,

            },
          },
          {
            path: 'edit/:id',
            component: EditPaymentOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_PAYMENT_OUT,
              pageTitle: BreadcrumbLabel.EDIT_PAYMENT_OUT,
            },
          },
          {
            path: 'view/:id',
            component: ViewPaymentOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_PAYMENT_OUT,
              pageTitle: BreadcrumbLabel.VIEW_PAYMENT_OUT,

            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.Finance,
              pageId: Pages.PaymentOut,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,

            },
          },
        ],
      },
      {
        path:'read-excel',component:ReadExcelComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AddPaymentInComponent,
    EditPaymentInComponent,
    ViewPaymentInComponent,
    PaymentInListComponent,
    MainPaymentInComponent,
    AddCostCenterComponent,
    PaymentMethodComponent,
    PopupAccountsComponent,
    AddPaymentOutComponent,
    EditPaymentOutComponent,
    ViewPaymentOutComponent,
    MainPaymentOutComponent,
    PaymentOutListComponent,
    AddPaymentOutCostCenterComponent,
    PaymentOutPaymentMethodComponent,
    ReadExcelComponent,
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class TranscationsModule {}
