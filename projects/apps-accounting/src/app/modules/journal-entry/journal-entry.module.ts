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

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: '',
        component: JournalEntryListComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
        },
      },
      {
        path: 'add',
        component: CreateJournalEntryComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_ADD,
        },
      },

      {
        path: 'view/:id',
        component: ViewJournalEntryComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_VIEW,
        },
      },

      {
        path: 'edit/:id',
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
