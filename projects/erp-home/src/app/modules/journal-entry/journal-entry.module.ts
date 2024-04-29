import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../layout/layout-page/layout-page.component';
import { JournalEntryComponent } from './pages/journal-entry/journal-entry.component';
import { BreadcrumbLabel, LayoutComponent, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';
import { AuthGuard } from 'microtec-auth-lib';
import { JournalTemplatePopupComponent } from './pages/components/journal-template-popup/journal-template-popup.component';


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
        component: JournalEntryComponent,
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
    JournalEntryComponent,
    JournalEntryListComponent,
    JournalTemplatePopupComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(routes)
  ]
})
export class JournalEntryModule { }
