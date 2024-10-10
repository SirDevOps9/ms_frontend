import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'microtec-auth-lib';
import { TreauryDefinitionListComponent } from './pages/treasury-definition/treaury-definition-list/treaury-definition-list.component';
import { AddTreasuryComponent } from './components/add-treasury/add-treasury.component';
import { EditTreasuryComponent } from './components/edit-treasury/edit-treasury.component';
import { ViewTreasuryComponent } from './components/view-treasury/view-treasury.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { BankDefinitionListComponent } from './pages/bank-definition/bank-definition-list/bank-definition-list.component';
import { AddBankDefinitionComponent } from './pages/bank-definition/add-bank-definition/add-bank-definition.component';
import { EditBankDefinitionComponent } from './pages/bank-definition/edit-bank-definition/edit-bank-definition.component';
import { NoChildrenAccountsComponent } from './components/bank/no-children-accounts/no-children-accounts.component';
import { ConfirmOpeningBalanceComponent } from './components/bank/confirm-opening-balance/confirm-opening-balance.component';
import { PaymentTermListComponent } from './pages/payment-term/payment-term-list/payment-term-list.component';
import { AddPaymentTermComponent } from './pages/payment-term/add-payment-term/add-payment-term.component';
import { EditPaymentTermComponent } from './pages/payment-term/edit-payment-term/edit-payment-term.component';
import { MainBankDefinitionComponent } from './pages/bank-definition/main-bank-definition/main-bank-definition.component';
import { MainPaymentTermComponent } from './pages/payment-term/main-payment-term/main-payment-term.component';
import { PaymentMethodListComponent } from './pages/payment-method/payment-method-list/payment-method-list.component';
import { AddPaymentMethodComponent } from './pages/payment-method/add-payment-method/add-payment-method.component';
import { EditPaymentMethodComponent } from './pages/payment-method/edit-payment-method/edit-payment-method.component';
import { ViewPaymentMethodComponent } from './pages/payment-method/view-payment-method/view-payment-method.component';
import { MainPaymentMethodComponent } from './pages/payment-method/main-payment-method/main-payment-method.component';
import { ViewBankDefinitionComponent } from './pages/bank-definition/view-bank-definition/view-bank-definition.component';
import { ViewPaymentTermComponent } from './pages/payment-term/view-payment-term/view-payment-term.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: '',
        component: TreauryDefinitionListComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TREASURY_LIST,
          pageTitle: BreadcrumbLabel.TREASURY_LIST,

          
        },
      },
      {
        path: 'treasury-list',
        component: TreauryDefinitionListComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TREASURY_LIST,
          pageTitle: BreadcrumbLabel.TREASURY_LIST,

        },
      },
      {
        path: 'bank-definition',
        component: MainBankDefinitionComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.BANK_LIST,
          pageTitle: BreadcrumbLabel.BANK_LIST,

        },
        children:[
          {
            path: '',
            component: BankDefinitionListComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-bank-definition',
            component: AddBankDefinitionComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.BANK_LIST_ADD,
              pageTitle: BreadcrumbLabel.BANK_LIST_ADD,

            },
          },
          {
            path: 'edit-bank-definition/:id',
            component: EditBankDefinitionComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.BANK_LIST_EDIT,
              pageTitle: BreadcrumbLabel.BANK_LIST_EDIT,

            },
          },
          {
            path: 'view-bank-definition/:id',
            component: ViewBankDefinitionComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_BANK_DEFINATION,
              pageTitle: BreadcrumbLabel.VIEW_BANK_DEFINATION,

            },
          },
        ]
      },
      {
        path: 'paymentterm',
        component: MainPaymentTermComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_LIST,
          pageTitle: BreadcrumbLabel.PAYMENT_TERM_LIST,

        },
        children:[
          {
            path: '',
            component: PaymentTermListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-payment-term',
            component: AddPaymentTermComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_TERM_Add,
              pageTitle: BreadcrumbLabel.PAYMENT_TERM_Add,

            },
          },
          {
            path: 'edit-payment-term/:id',
            component: EditPaymentTermComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_TERM_Edit,
              pageTitle: BreadcrumbLabel.PAYMENT_TERM_Edit,

            },
          },
          {
            path: 'view-payment-term/:id',
            component: ViewPaymentTermComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_PAYMENT_TERM,
              pageTitle: BreadcrumbLabel.VIEW_PAYMENT_TERM,

            },
          },
        ]
        },
      {
        path: 'add-payment-term',
        component: AddPaymentTermComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_ADD,
          pageTitle: BreadcrumbLabel.PAYMENT_TERM_ADD,

        },
      },
      {
        path: 'edit-payment-term/:id',
        component: EditPaymentTermComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_EDIT,
          pageTitle: BreadcrumbLabel.PAYMENT_TERM_EDIT,

        },
      },
      {
        path: 'payment-method',
        component: MainPaymentMethodComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_METHOD_LIST,
          pageTitle: BreadcrumbLabel.PAYMENT_METHOD_LIST,

        },
        children:[
          {
            path: '',
            component: PaymentMethodListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_METHOD_LIST,
              pageTitle: BreadcrumbLabel.PAYMENT_METHOD_LIST,

            },
          },
          {
            path: 'add',
            component: AddPaymentMethodComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_METHOD_ADD,
              pageTitle: BreadcrumbLabel.PAYMENT_METHOD_ADD,

            },
          },
          {
            path: 'edit/:id',
            component: EditPaymentMethodComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_METHOD_EDIT,
              pageTitle: BreadcrumbLabel.PAYMENT_METHOD_EDIT,

            },
          },
          {
            path: 'view/:id',
            component: ViewPaymentMethodComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PAYMENT_METHOD_VIEW,
              pageTitle: BreadcrumbLabel.PAYMENT_METHOD_VIEW,

            },
          },
          
        ]
      },

   

      //   path: 'payment-in',
      //   component: PaymentInListComponent,
      //   data: {
      //     breadcrumb: BreadcrumbLabel.PAYMENT_IN_LIST,
      //   },
      // }
    ],
  },
];
@NgModule({
  declarations: [
    TreauryDefinitionListComponent,
    AddTreasuryComponent,
    EditTreasuryComponent,
    ViewTreasuryComponent,
    ConfirmComponent,
    BankDefinitionListComponent,
    AddBankDefinitionComponent,
    EditBankDefinitionComponent,
    NoChildrenAccountsComponent,
    ConfirmOpeningBalanceComponent,
    PaymentTermListComponent,
    AddPaymentTermComponent,
    EditPaymentTermComponent,
    MainBankDefinitionComponent,
    MainPaymentTermComponent,
    PaymentMethodListComponent,
    AddPaymentMethodComponent,
    EditPaymentMethodComponent,
    ViewPaymentMethodComponent,
    MainPaymentMethodComponent,
    ViewBankDefinitionComponent,
    ViewPaymentTermComponent

    
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class FinanceModule {}