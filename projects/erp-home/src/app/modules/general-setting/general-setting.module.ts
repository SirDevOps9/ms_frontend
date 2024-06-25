import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagAddComponent } from './components/tag-add/tag-add.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { TagListComponent } from './pages/tags/tag-list/tag-list.component';
import { FinancialCalendarListComponent } from './pages/financial-calendar/financial-calendar-list/financial-calendar-list.component';
import { CreateFinancialCalendarComponent } from './components/create-financial-calendar/create-financial-calendar.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.GeneralSettings,
    },
    children: [
      {
        path: '',
        component: TagListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },
      {
        path: 'financial-calendar',
        component: FinancialCalendarListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
      },

    ],
  },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagAddComponent,
    TagEditComponent,
    FinancialCalendarListComponent,
    CreateFinancialCalendarComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class GeneralSettingModule {}
