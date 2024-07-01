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
import { EditFinancialCalendarComponent } from './components/edit-financial-calendar/edit-financial-calendar.component';
import { VendorCategoryListComponent } from './pages/vendor-category/vendor-category-list/vendor-category-list.component';
import { CreateVendorCategoryComponent } from './components/create-vendor-category/create-vendor-category.component';
import { EditVendorCategoryComponent } from './components/edit-vendor-category/edit-vendor-category.component';


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
      {
        path: 'add-financial-calendar',
        component: CreateFinancialCalendarComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
      },
      {
        path: 'edit-financial-calendar/:id',
        component: EditFinancialCalendarComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
      },
      {
        path: 'vendor-category',
        component: VendorCategoryListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.vendor_list,
        },
      },
      {
        path: 'add-vendor-category',
        component: CreateVendorCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.vendor_Add,
        },
      },
      {
        path: 'edit-vendor-category/:id',
        component: EditVendorCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.vendor_Edit,
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
    CreateFinancialCalendarComponent,
    EditFinancialCalendarComponent,
    VendorCategoryListComponent,
    CreateVendorCategoryComponent,
    EditVendorCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class GeneralSettingModule {}
