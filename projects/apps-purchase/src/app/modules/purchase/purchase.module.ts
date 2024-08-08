import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { EditVendorCategoryComponent } from './pages/vendor-category/edit-vendor-category/edit-vendor-category.component';
import { AuthGuard } from 'microtec-auth-lib';
import { CreateVendorCategoryComponent } from './pages/vendor-category/create-vendor-category/create-vendor-category.component';
import { VendorCategoryListComponent } from './pages/vendor-category/vendor-category-list/vendor-category-list.component';
import { EditVendorDefinitionsComponent } from './pages/vendor-definitions/edit-vendor-definitions/edit-vendor-definitions.component';
import { AddVendorDefinitionsComponent } from './pages/vendor-definitions/add-vendor-definitions/add-vendor-definitions.component';
import { VendorDefinitionsListComponent } from './pages/vendor-definitions/vendor-definitions-list/vendor-definitions-list.component';
import { MainVendorCategoryComponent } from './pages/vendor-category/main-vendor-category/main-vendor-category.component';
import { MainVendorDefintionsComponent } from './pages/vendor-definitions/main-vendor-defintions/main-vendor-defintions.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Purchase,
    },
    children: [
      {
        path: 'vendor-category',
        component: MainVendorCategoryComponent,
      //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.vendor_list,
        },
        children:[
          {
            path: '',
            component: VendorCategoryListComponent,
          //  canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-vendor-category',
            component: CreateVendorCategoryComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.vendor_Add,
            },
          },
          {
            path: 'edit-vendor-category/:id',
            component: EditVendorCategoryComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.vendor_Edit,
            },
          },
        ]
      },
      {
        path: 'vendor-definitions',
        component: MainVendorDefintionsComponent,
       // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.VENDOR_DEFINITIONS,
        },
        children:[
          {
            path: '',
            component: VendorDefinitionsListComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-vendor-definitions',
            component: AddVendorDefinitionsComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.ADD_VENDOR_DEFINITIONS,
            },
          },
          {
            path: 'edit-vendor-definitions/:id',
            component: EditVendorDefinitionsComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_VENDOR_DEFINITIONS,
            },
          },
        ]
      },
    ],
  },
];

@NgModule({
  declarations: [
    VendorCategoryListComponent,
    CreateVendorCategoryComponent,
    EditVendorCategoryComponent,
    VendorDefinitionsListComponent,
    AddVendorDefinitionsComponent,
    EditVendorDefinitionsComponent,
    MainVendorCategoryComponent,
    MainVendorDefintionsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class PurchaseModule {}
