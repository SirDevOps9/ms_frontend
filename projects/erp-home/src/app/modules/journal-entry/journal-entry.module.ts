import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../layout/layout-page/layout-page.component';
import { JournalEntryComponent } from './pages/journal-entry/journal-entry.component';
import { BreadcrumbLabel, LayoutComponent, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';
import { AuthGuard } from 'microtec-auth-lib';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'journalentry',
        component: JournalEntryListComponent,
       // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.COMPANY_LIST,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [
    JournalEntryComponent,
    JournalEntryListComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(routes)
  ]
})
export class JournalEntryModule { }
