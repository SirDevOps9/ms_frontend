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
import { LayoutPageComponent } from 'apps-shared-lib';
import { AddPaymentOutComponent } from './pages/paymentout/add-payment-out/add-payment-out.component';
import { EditPaymentOutComponent } from './pages/paymentout/edit-payment-out/edit-payment-out.component';
import { ViewPaymentOutComponent } from './pages/paymentout/view-payment-out/view-payment-out.component';
import { MainPaymentOutComponent } from './pages/paymentout/main-payment-out/main-payment-out.component';
import { PaymentOutListComponent } from './pages/paymentout/payment-out-list/payment-out-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: 'paymentin',
        component: MainPaymentInComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_IN,
        },
        children:[
          {
            path: '',
            component: PaymentInListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_IN_LIST,
            },
          },
          {
            path: 'add',
            component: AddPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_PAYMENT_IN,
            },
          },
          {
            path: 'edit/:id',
            component: EditPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_PAYMENT_IN,
            },
          },
          {
            path: 'view/:id',
            component: ViewPaymentInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_PAYMENT_IN,
            }
          }
        ]
        },
        {
          path: 'paymentout',
          component: MainPaymentOutComponent,
          data: {
            breadcrumb: BreadcrumbLabel.PAYMENT_OUT,
          },
          children:[
            {
              path: '',
              component: PaymentOutListComponent,
              data: {
                breadcrumb: BreadcrumbLabel.PAYMENT_OUT_LIST,
              },
            },
            {
              path: 'add',
              component: AddPaymentOutComponent,
              data: {
                breadcrumb: BreadcrumbLabel.ADD_PAYMENT_OUT,
              },
            },
            {
              path: 'edit/:id',
              component: EditPaymentOutComponent,
              data: {
                breadcrumb: BreadcrumbLabel.EDIT_PAYMENT_OUT,
              },
            },
          ]
          },
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
    PaymentOutListComponent
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],

})
export class TranscationsModule { }