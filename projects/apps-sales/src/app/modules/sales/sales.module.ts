import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { CustomerCategoryListComponent } from './pages/customer-category/customer-category-list/customer-category-list.component';
import { CreateCustomerCategoryComponent } from './pages/customer-category/create-customer-category/create-customer-category.component';
import { EditCustomerCategoryComponent } from './pages/customer-category/edit-customer-category/edit-customer-category.component';
import { AddCustomerComponent } from './pages/customer-definitions/add-customer/add-customer.component';
import { CustomerListComponent } from './pages/customer-definitions/customer-list/customer-list.component';
import { EditCustomerComponent } from './pages/customer-definitions/edit-customer/edit-customer.component';
import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
import { AddCustomerOpeeningBalanceComponent } from './pages/customer-opening-balance/add-customer-opeening-balance/add-customer-opeening-balance.component';
import { CustomerOpeningBalanceNoChildrenComponent } from './components/customer-opening-Balance/customer-opening-balance-no-children/customer-opening-balance-no-children.component';
import { CustomerOpeningBalanceDistributeComponent } from './components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import { MainCustomerCategoryComponent } from './pages/customer-category/main-customer-category/main-customer-category.component';
import { MainCustomerDefintionComponent } from './pages/customer-definitions/main-customer-defintion/main-customer-defintion.component';
import { MainCustomerOpeningBalanceComponent } from './pages/customer-opening-balance/main-customer-opening-balance/main-customer-opening-balance.component';
import { CustomerOpeningBalanceListComponent } from './pages/customer-opening-balance/customer-opening-balance-list/customer-opening-balance-list.component';
import { EditCustomerOpeningBalanceComponent } from './pages/customer-opening-balance/edit-customer-opening-balance/edit-customer-opening-balance.component';
import { ViewCustomerOpeningBalanceComponent } from './pages/customer-opening-balance/view-customer-opening-balance/view-customer-opening-balance.component';
import { CustomerObViewDistributionComponent } from './components/customer-ob-view-distribution/customer-ob-view-distribution.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      {
        path: 'customer-category',
        component: MainCustomerCategoryComponent,
        data: {
          breadcrumb: BreadcrumbLabel.customer_list,
        },
        children:[
          {
            path: '',
            component: CustomerCategoryListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-customer-category',
            component: CreateCustomerCategoryComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.customer_add,
            },
          },
          {
            path: 'edit-customer-category/:id',
            component: EditCustomerCategoryComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.customer_edit,
            },
          },
        ]
      },
      {
        path: 'customer-definitions',
        component: MainCustomerDefintionComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_DEFINITIONS,
        },
        children:[
          {
            path: '',
            component: CustomerListComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-customer-definitions',
            component: AddCustomerComponent,
            //  canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.ADD_CUSTOMER_DEFINITIONS,
            },
          },
          {
            path: 'edit-customer-definitions/:id',
            component: EditCustomerComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_CUSTOMER_DEFINITIONS,
            },
            
          },
        ]
      },

      {
        path: 'customer-opening-balance',
        component: MainCustomerOpeningBalanceComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_OPENEING_BALANCE_List,
        },
        children:[
          {
            path: '',
            component: CustomerOpeningBalanceListComponent,
            //  canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            }
          },
          {
            path: 'add-customer-opening-balance',
            component: AddCustomerOpeeningBalanceComponent,
            //  canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.ADD_CUSTOMER_OPENEING_BALANCE,
            }
          },
          {
            path: 'edit-customer-opening-balance/:id',
            component: EditCustomerOpeningBalanceComponent,
            //  canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_CUSTOMER_OPENEING_BALANCE,
            }
          },
          {
            path: 'view-customer-opening-balance/:id',
            component: ViewCustomerOpeningBalanceComponent,
            //  canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_CUSTOMER_OPENEING_BALANCE,
            }
          }
        ]
      },
    ],
  },
];

@NgModule({
  declarations: [
    CustomerCategoryListComponent,
    CreateCustomerCategoryComponent,
    EditCustomerCategoryComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    CustomerListComponent,
    AddCustomerOpeeningBalanceComponent,
    CustomerOpeningBalanceNoChildrenComponent,
    CustomerOpeningBalanceDistributeComponent,
    MainCustomerCategoryComponent,
    MainCustomerDefintionComponent,
    CustomerOpeningBalanceListComponent,
    MainCustomerOpeningBalanceComponent,
    EditCustomerOpeningBalanceComponent,
    ViewCustomerOpeningBalanceComponent,
    CustomerObViewDistributionComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class SalesModule {}
