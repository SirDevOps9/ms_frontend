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
import { AuthGuard } from 'microtec-auth-lib';
import { NoChildrenAccountsComponent } from './components/noChildrenAccounts/nochildaccounts.component';
import { ViewJournalEntryComponent } from './pages/components/view-journal-entry/view-journal-entry.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'journalentry',
        component: JournalEntryListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
        },
      },
      {
        path: 'journalentry/add',
        component: CreateJournalEntryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_ADD,
        },
      },
    
      {
        path: 'journalentry/view/:id',
        component: ViewJournalEntryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_VIEW,
        },
      },
    
      {
        path: 'journalentry/edit/:id',
        component: EditJournalEntryComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_Edit,
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
    ViewJournalEntryComponent
  ],
  imports: [ 
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class JournalEntryModule {}
