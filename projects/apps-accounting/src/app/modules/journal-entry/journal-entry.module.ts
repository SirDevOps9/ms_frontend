import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';
import { CreateJournalEntryComponent } from './pages/create-journal-entry/create-journal-entry.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { JournalTemplatePopupComponent } from './pages/components/journal-template-popup/journal-template-popup.component';
import { EditJournalEntryComponent } from './pages/edit-journal-entry/edit-journal-entry.component';
import { LayoutPageComponent } from 'apps-shared-lib';
import {
  Actions,
  Apps,
  AuthGuard,
  MicrotecAuthLibModule,
  RouteFilter,
  Services,
} from 'microtec-auth-lib';
import { NoChildrenAccountsComponent } from './components/noChildrenAccounts/nochildaccounts.component';
import { ViewJournalEntryComponent } from './pages/components/view-journal-entry/view-journal-entry.component';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { CostCenterAllocationPopupComponent } from './pages/components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { EditCostCenterAllocationPopupComponent } from './pages/components/edit-cost-center-allocation-popup/edit-cost-center-allocation-popup.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: JournalEntryListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
          filter: {
            App: Apps.GeneralLedger,
            Service: Services.JournalLine,
            Action: Actions.View,
          } as RouteFilter,
        },
      },
      {
        path: 'journalentry',
        component: JournalEntryListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
          filter: {
            App: Apps.GeneralLedger,
            Service: Services.JournalLine,
            Action: Actions.View,
          } as RouteFilter,
        },
      },
      {
        path: 'journalentry/add',
        component: CreateJournalEntryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_ADD,
          filter: {
            App: Apps.GeneralLedger,
            Service: Services.JournalLine,
            Action: Actions.Create,
          } as RouteFilter,
        },
      },

      {
        path: 'journalentry/view/:id',
        component: ViewJournalEntryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_VIEW,
          filter: {
            App: Apps.GeneralLedger,
            Service: Services.JournalLine,
            Action: Actions.View,
          } as RouteFilter,
        },
      },

      {
        path: 'journalentry/edit/:id',
        component: EditJournalEntryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_Edit,
          filter: {
            App: Apps.GeneralLedger,
            Service: Services.JournalLine,
            Action: Actions.Update,
          } as RouteFilter,
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
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    GuidedTourModule,
    RouterModule.forChild(routes),
    MicrotecAuthLibModule,
  ],
  providers: [GuidedTourService],
})
export class JournalEntryModule {}
