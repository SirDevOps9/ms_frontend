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
        },
      },
      {
        path: 'treasury-list',
        component: TreauryDefinitionListComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TREASURY_LIST,
        },
      },
      {
        path: 'bank-definition',
        component: BankDefinitionListComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.BANK_LIST,
        },
      },
      {
        path: 'add-bank-definition',
        component: AddBankDefinitionComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.BANK_LIST_ADD,
        },
      },
      {
        path: 'edit-bank-definition/:id',
        component: EditBankDefinitionComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.BANK_LIST_EDIT,
        },
      },
      {
        path: 'paymentterm',
        component: PaymentTermListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_LIST,
        },
      },
      {
        path: 'add-payment-term',
        component: PaymentTermListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_LIST,
        },
      },
      {
        path: 'edit-payment-term',
        component: PaymentTermListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PAYMENT_TERM_LIST,
        },
      },
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
    PaymentTermListComponent
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class FinanceModule {}
