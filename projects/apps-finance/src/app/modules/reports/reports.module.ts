import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountStatementComponent } from './pages/bank-account-statement/bank-account-statement.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: 'bankaccountstatement',
        component: BankAccountStatementComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.BANK_ACCOUNT_STATEMENT,
        },
      },
    ],
  },
];
@NgModule({
  declarations: [BankAccountStatementComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class ReportsModule {}
