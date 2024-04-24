import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../layout/layout-page/layout-page.component';
import { JournalEntryComponent } from './pages/journal-entry/journal-entry.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { JournalEntryListComponent } from './pages/journal-entry-list/journal-entry-list.component';


const routes = [
  {path : '' , component : JournalEntryListComponent},
  {path : 'add' , component : JournalEntryComponent}
]

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
