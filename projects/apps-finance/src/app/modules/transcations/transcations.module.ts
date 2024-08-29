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
    PopupAccountsComponent
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],

})
export class TranscationsModule { }
