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
import { CustomerCategoryListComponent } from './pages/customer-category/customer-category-list/customer-category-list.component';
import { CreateCustomerCategoryComponent } from './components/create-customer-category/create-customer-category.component';
import { EditCustomerCategoryComponent } from './components/edit-customer-category/edit-customer-category.component';
import { CustomerListComponent } from './pages/customer-definitions/customer-list/customer-list.component';
import { AddCustomerComponent } from './pages/customer-definitions/add-customer/add-customer.component';
import { EditCustomerComponent } from './pages/customer-definitions/edit-customer/edit-customer.component';
import { VendorDefinitionsListComponent } from './pages/vendor-definitions/vendor-definitions-list/vendor-definitions-list.component';
import { AddVendorDefinitionsComponent } from './pages/vendor-definitions/add-vendor-definitions/add-vendor-definitions.component';
import { EditVendorDefinitionsComponent } from './pages/vendor-definitions/edit-vendor-definitions/edit-vendor-definitions.component';

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
      {
        path: 'customer-category',
        component: CustomerCategoryListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.customer_list,
        },
      },
      {
        path: 'add-customer-category',
        component: CreateCustomerCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.customer_add,
        },
      },
      {
        path: 'edit-customer-category/:id',
        component: EditCustomerCategoryComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.customer_edit,
        },
      },
      {
        path: 'customer-definitions',
        component: CustomerListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_DEFINITIONS,
        },
      },
      {
        path: 'add-customer-definitions',
        component: AddCustomerComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ADD_CUSTOMER_DEFINITIONS,
        },
      },
      {
        path: 'edit-customer-definitions/:id',
        component: EditCustomerComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EDIT_CUSTOMER_DEFINITIONS,
        },
      },
      {
        path: 'vendor-definitions',
        component: VendorDefinitionsListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.VENDOR_DEFINITIONS,
        },
      },
      {
        path: 'add-vendor-definitions',
        component: AddVendorDefinitionsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ADD_VENDOR_DEFINITIONS,
        },
      },
      {
        path: 'edit-vendor-definitions/:id',
        component: EditVendorDefinitionsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EDIT_VENDOR_DEFINITIONS,
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
    EditVendorCategoryComponent,
    CustomerCategoryListComponent,
    CreateCustomerCategoryComponent,
    EditCustomerCategoryComponent,
    CustomerListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    VendorDefinitionsListComponent,
    AddVendorDefinitionsComponent,
    EditVendorDefinitionsComponent,
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
})
export class GeneralSettingModule {}
