import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../layout/layout-page/layout-page.component';
import { BreadcrumbLabel, LayoutComponent, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';
import { AuthGuard } from 'microtec-auth-lib';
import { CreateJournalEntryComponent } from './pages/create-journal-entry/create-journal-entry.component';
import { AccountsComponent } from './components/accounts/accounts.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'journalentry',
        component: JournalEntryListComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_LIST,
        },
      },
      {
        path: 'journalentry/add',
        component: CreateJournalEntryComponent,
       // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.JOURNAL_ADD,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [
    CreateJournalEntryComponent,
    JournalEntryListComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(routes)
  ]
})
export class JournalEntryModule { }
