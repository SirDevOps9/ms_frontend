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
import { CostCenterReportComponent } from './pages/report/cost-center-report/cost-center-report.component';

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
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
        },
      },
      {
        path: 'journalentry/add',
        component: CreateJournalEntryComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_ADD,
        },
      },

      {
        path: 'journalentry/view/:id',
        component: ViewJournalEntryComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_VIEW,
        },
      },

      {
        path: 'journalentry/edit/:id',
        component: EditJournalEntryComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_Edit,
        },
      },
      {
        path: 'trial-balance',
        component: TrialBlanceComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TRIAL_BALANCE,
        },
      },
      {
        path: 'cost-center',
        component: CostCenterReportComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.COST_CENTER,
        },
      },
      {
        path: 'account-statement',
        component: AccountStatementComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ACCOUNT_STATEMENT,
        },
      },
      {
        path: 'account-statement/:id',
        component: AccountStatementComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ACCOUNT_STATEMENT,
        },
      },
      {
        path: 'journal-entry-opening-balance',
        children : [
          {path: '',  component: JournalEntryOpeningBalanceListComponent,
          // canActivate: [AuthGuard],
          data: {
            breadcrumb: BreadcrumbLabel.JOURNAL_OPENING_BALANCE,
          },
        },
        {
          path: 'add',
          component: AddJournalEntryOpeningBalanceComponent,
          // canActivate: [AuthGuard],
          data: {
            breadcrumb: BreadcrumbLabel.ADD_JOURNAL_OPENING_BALANCE,
          },
        },
        {
          path: 'edit/:id',
          component: EditJournalEntryOpeningBalanceComponent,
          // canActivate: [AuthGuard],
          data: {
            breadcrumb: BreadcrumbLabel.EDIT_JOURNAL_OPENING_BALANCE,
          },
        },
        {
          path: 'view/:id',
          component: ViewJournalEntryOpeningBalanceComponent,
          // canActivate: [AuthGuard],
          data: {
            breadcrumb: BreadcrumbLabel.VIEW_JOURNAL_OPENING_BALANCE,
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
    CostCenterReportComponent,
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
