import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';
import { CreateJournalEntryComponent } from './pages/create-journal-entry/create-journal-entry.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { JournalTemplatePopupComponent } from './pages/components/journal-template-popup/journal-template-popup.component';
import { EditJournalEntryComponent } from './pages/edit-journal-entry/edit-journal-entry.component';
import { LayoutPageComponent } from 'apps-shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { NoChildrenAccountsComponent } from './components/noChildrenAccounts/nochildaccounts.component';
import { ViewJournalEntryComponent } from './pages/components/view-journal-entry/view-journal-entry.component';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { CostCenterAllocationPopupComponent } from './pages/components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { EditCostCenterAllocationPopupComponent } from './pages/components/edit-cost-center-allocation-popup/edit-cost-center-allocation-popup.component';
import { TrialBlanceComponent } from './pages/report/trial-blance/trial-blance.component';
import { AccountStatementComponent } from './pages/report/account-statement/account-statement.component';
import { JournalEntryOpeningBalanceListComponent } from './pages/journal-entry-opening-balance/journal-entry-opening-balance-list/journal-entry-opening-balance-list.component';
import { AddJournalEntryOpeningBalanceComponent } from './pages/journal-entry-opening-balance/add-journal-entry-opening-balance/add-journal-entry-opening-balance.component';
import { EditJournalEntryOpeningBalanceComponent } from './pages/journal-entry-opening-balance/edit-journal-entry-opening-balance/edit-journal-entry-opening-balance.component';
import { ViewJournalEntryOpeningBalanceComponent } from './pages/journal-entry-opening-balance/view-journal-entry-opening-balance/view-journal-entry-opening-balance.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: 'journalentry',
        component: JournalEntryListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.JournalEntryList,
        },
      },
      {
        path: 'journalentry/add',
        component: CreateJournalEntryComponent,
        data: {
          breadcrumb: BreadcrumbLabel.JournalEntryAdd,
        },
      },
      {
        path: 'journalentry/view/:id',
        component: ViewJournalEntryComponent,
        data: {
          breadcrumb: BreadcrumbLabel.JournalEntryView,
        },
      },
      {
        path: 'journalentry/edit/:id',
        component: EditJournalEntryComponent,
        data: {
          breadcrumb: BreadcrumbLabel.JournalEntryEdit,
        },
      },
      {
        path: 'trial-balance',
        component: TrialBlanceComponent,
        data: {
          breadcrumb: BreadcrumbLabel.TrialBalance,
        },
      },
      {
        path: 'account-statement',
        component: AccountStatementComponent,
        data: {
          breadcrumb: BreadcrumbLabel.AccountStatement,
        },
      },
      {
        path: 'account-statement/:id',
        component: AccountStatementComponent,
        data: {
          breadcrumb: BreadcrumbLabel.AccountStatement,
        },
      },
      {
        path: 'journal-entry-opening-balance',
        children: [
          {
            path: '',
            component: JournalEntryOpeningBalanceListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.JournalEntryOpeningBalance,
            },
          },
          {
            path: 'add',
            component: AddJournalEntryOpeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.AddJournalEntryOpeningBalance,
            },
          },
          {
            path: 'edit/:id',
            component: EditJournalEntryOpeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EditJournalEntryOpeningBalance,
            },
          },
          {
            path: 'view/:id',
            component: ViewJournalEntryOpeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ViewJournalEntryOpeningBalance,
            },
          },
        ]
      },
    ],
  },
];


@NgModule({
  declarations: [
    CreateJournalEntryComponent,
    JournalEntryListComponent,
    AccountsComponent,
    NoChildrenAccountsComponent,
    AttachmentsComponent,
    JournalTemplatePopupComponent,
    EditJournalEntryComponent,
    ViewJournalEntryComponent,
    CostCenterAllocationPopupComponent,
    EditCostCenterAllocationPopupComponent,
    TrialBlanceComponent,
    AccountStatementComponent,
    JournalEntryOpeningBalanceListComponent,
    AddJournalEntryOpeningBalanceComponent,
    EditJournalEntryOpeningBalanceComponent,
    ViewJournalEntryOpeningBalanceComponent,
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    GuidedTourModule,
    RouterModule.forChild(routes),
  ],
  providers: [GuidedTourService],
})
export class JournalEntryModule {}
