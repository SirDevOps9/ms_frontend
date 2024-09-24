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
import { VendorOpeningBalanceComponent } from './pages/vendor-opening-balance/vendor-opening-balance.component';
import { VendorOpeningBalanceListComponent } from './pages/vendor-opening-balance/vendor-opening-balance-list/vendor-opening-balance-list.component';
import { VendorOpeningBalanceMainComponent } from './pages/vendor-opening-balance/vendor-opening-balance-main/vendor-opening-balance-main.component';
import { VendorOpeningBalanceAddComponent } from './pages/vendor-opening-balance/vendor-opening-balance-add/vendor-opening-balance-add.component';
import { VendorOpeningBalanceEditComponent } from './pages/vendor-opening-balance/vendor-opening-balance-edit/vendor-opening-balance-edit.component';
import { VendorOpeningBalanceDistributeComponent } from './components/vendor-opening-balance-distribute/vendor-opening-balance-distribute.component';
import { VendorOpeningBalanceViewComponent } from './pages/vendor-opening-balance/vendor-opening-balance-view/vendor-opening-balance-view.component';
import { VendorOpeningBalanceDistributeViewComponent } from './components/vendor-opening-balance-distribute-view/vendor-opening-balance-distribute-view.component';

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
          pageTitle: BreadcrumbLabel.vendor_list,
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
              pageTitle: BreadcrumbLabel.vendor_Add,

            },
          },
          {
            path: 'edit-vendor-category/:id',
            component: EditVendorCategoryComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.vendor_Edit,
              pageTitle: BreadcrumbLabel.vendor_Edit,

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
          pageTitle: BreadcrumbLabel.VENDOR_DEFINITIONS,

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
              pageTitle: BreadcrumbLabel.ADD_VENDOR_DEFINITIONS,

            },
          },
          {
            path: 'edit-vendor-definitions/:id',
            component: EditVendorDefinitionsComponent,
           // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_VENDOR_DEFINITIONS,
              pageTitle: BreadcrumbLabel.EDIT_VENDOR_DEFINITIONS,

            },
          },
        ]
      },
      {
        path: 'vendor-opening-balance',
        component: MainVendorDefintionsComponent,
        data: {
          breadcrumb: BreadcrumbLabel.VENDOR_OPENING_BALANCE,
          pageTitle: BreadcrumbLabel.VENDOR_OPENING_BALANCE,
        },
        children:[
          {
            path: '',
            component: VendorOpeningBalanceListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-vendor-opening-balance',
            component: VendorOpeningBalanceAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VENDOR_OPENING_BALANCE_ADD,
              pageTitle: BreadcrumbLabel.VENDOR_OPENING_BALANCE_ADD,

            },
          },
          {
            path: 'edit-vendor-opening-balance/:id',
            component: VendorOpeningBalanceEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VENDOR_OPENING_BALANCE_EDIT,
              pageTitle: BreadcrumbLabel.VENDOR_OPENING_BALANCE_EDIT,

            },
          },
          {
            path: 'view-vendor-opening-balance/:id',
            component: VendorOpeningBalanceViewComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VENDOR_OPENING_BALANCE_VIEW,
              pageTitle: BreadcrumbLabel.VENDOR_OPENING_BALANCE_VIEW,

            },
          },
        ]
      }
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
    VendorOpeningBalanceComponent,
    MainVendorCategoryComponent,
    MainVendorDefintionsComponent,
    VendorOpeningBalanceListComponent,
    VendorOpeningBalanceMainComponent,
    VendorOpeningBalanceAddComponent,
    VendorOpeningBalanceEditComponent,
    VendorOpeningBalanceDistributeComponent,
    VendorOpeningBalanceViewComponent,
    VendorOpeningBalanceDistributeViewComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class PurchaseModule {}
