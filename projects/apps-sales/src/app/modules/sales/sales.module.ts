import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, Modules, Pages, SharedLibModule } from 'shared-lib';
import { CustomerCategoryListComponent } from './pages/customer-category/customer-category-list/customer-category-list.component';
import { CreateCustomerCategoryComponent } from './pages/customer-category/create-customer-category/create-customer-category.component';
import { EditCustomerCategoryComponent } from './pages/customer-category/edit-customer-category/edit-customer-category.component';
import { AddCustomerComponent } from './pages/customer-definitions/add-customer/add-customer.component';
import { CustomerListComponent } from './pages/customer-definitions/customer-list/customer-list.component';
import { EditCustomerComponent } from './pages/customer-definitions/edit-customer/edit-customer.component';
import { LandingPageComponent, LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
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
import { PricePolicyMainComponent } from './pages/price-policy/price-policy-main/price-policy-main.component';
import { PricePolicyListComponent } from './pages/price-policy/price-policy-list/price-policy-list.component';
import { MultiSelectItem } from 'primeng/multiselect';
import { MultiSelectItemsComponent } from './components/multi-select-items/multi-select-items.component';
import { AddPricePolicyComponent } from './pages/pricelist/add-price-policy/add-price-policy.component';
import { UpdetePricePolicyComponent } from './components/updete-price-policy/updete-price-policy.component';
import { PopupExcelComponent } from './components/popup-excel/popup-excel.component';
import { EditPricePolicyComponent } from './pages/price-policy/edit-price-policy/edit-price-policy.component';
import { ViewPricePolicyComponent } from './pages/price-policy/view-price-policy/view-price-policy.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      // Customer Category Routes
      {
        path: 'customer-category',
        component: MainCustomerCategoryComponent,
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_LIST,
          pageTitle: BreadcrumbLabel.CUSTOMER_LIST,
        },
        children: [
          {
            path: '',
            component: CustomerCategoryListComponent,
            data: { breadcrumb: '', pageTitle: BreadcrumbLabel.CUSTOMER_LIST },
          },
          {
            path: 'add-customer-category',
            component: CreateCustomerCategoryComponent,
            data: {
              breadcrumb: BreadcrumbLabel.CUSTOMER_ADD,
              pageTitle: BreadcrumbLabel.CUSTOMER_ADD,
            },
          },
          {
            path: 'edit-customer-category/:id',
            component: EditCustomerCategoryComponent,
            data: {
              breadcrumb: BreadcrumbLabel.CUSTOMER_EDIT,
              pageTitle: BreadcrumbLabel.CUSTOMER_EDIT,
            },
          },
        ],
      },
      // Customer Definitions Routes
      {
        path: 'customer-definitions',
        component: MainCustomerDefintionComponent,
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_DEFINITIONS,
          pageTitle: BreadcrumbLabel.CUSTOMER_DEFINITIONS,
        },
        children: [
          {
            path: '',
            component: CustomerListComponent,
            data: { breadcrumb: '', pageTitle: BreadcrumbLabel.CUSTOMER_DEFINITIONS },
          },
          {
            path: 'add-customer-definitions',
            component: AddCustomerComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_CUSTOMER_DEFINITIONS,
              pageTitle: BreadcrumbLabel.ADD_CUSTOMER_DEFINITIONS,
            },
          },
          {
            path: 'edit-customer-definitions/:id',
            component: EditCustomerComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_CUSTOMER_DEFINITIONS,
              pageTitle: BreadcrumbLabel.EDIT_CUSTOMER_DEFINITIONS,
            },
          },
        ],
      },
      // Customer Opening Balance Routes
      {
        path: 'customer-opening-balance',
        component: MainCustomerOpeningBalanceComponent,
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_OPENEING_BALANCE_List,
          pageTitle: BreadcrumbLabel.CUSTOMER_OPENEING_BALANCE_List,
        },
        children: [
          {
            path: '',
            component: CustomerOpeningBalanceListComponent,
            data: { breadcrumb: '', pageTitle: BreadcrumbLabel.CUSTOMER_OPENEING_BALANCE_List },
          },
          {
            path: 'add',
            component: AddCustomerOpeeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_CUSTOMER_OPENEING_BALANCE,
              pageTitle: BreadcrumbLabel.ADD_CUSTOMER_OPENEING_BALANCE,
            },
          },
          {
            path: 'edit/:id',
            component: EditCustomerOpeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_CUSTOMER_OPENEING_BALANCE,
              pageTitle: BreadcrumbLabel.EDIT_CUSTOMER_OPENEING_BALANCE,
            },
          },
          {
            path: 'view/:id',
            component: ViewCustomerOpeningBalanceComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_CUSTOMER_OPENEING_BALANCE,
              pageTitle: BreadcrumbLabel.VIEW_CUSTOMER_OPENEING_BALANCE,
            },
          },
        ],
      },
      // Price Policy Routes
      {
        path: 'price-policy',
        component: PricePolicyMainComponent,
        data: {
          breadcrumb: BreadcrumbLabel.PRICE_POLICY,
          pageTitle: BreadcrumbLabel.PRICE_POLICY,
        },
        children: [
          {
            path: '',
            component: PricePolicyListComponent,
            data: { breadcrumb: '', pageTitle: BreadcrumbLabel.PRICE_POLICY },
          },
          {
            path: 'add',
            component: AddPricePolicyComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PRICE_POLICY_ADD,
              pageTitle: BreadcrumbLabel.TITLE_PRICE_POLICY_ADD,
            },
          },
          {
            path: 'edit/:id',
            component: EditPricePolicyComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PRICE_POLICY_EDIT,
              pageTitle: BreadcrumbLabel.TITLE_PRICE_POLICY_EDIT,
            },
          },
          {
            path: 'view/:id',
            component: ViewPricePolicyComponent,
            data: {
              breadcrumb: BreadcrumbLabel.PRICE_POLICY_VIEW,
              pageTitle: BreadcrumbLabel.TITLE_PRICE_POLICY_VIEW,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: { breadcrumb: BreadcrumbLabel.SEQUENCE, pageTitle: BreadcrumbLabel.SEQUENCE },
          },
        ],
      },
    ],
  },

  {
    path: '',
    loadChildren: () =>
      import('../man-sales-module/man-sales.module').then((m) => m.ManSalesModule),
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
    CustomerObViewDistributionComponent,
    PricePolicyListComponent,
    PricePolicyMainComponent,
    AddPricePolicyComponent,
    MultiSelectItemsComponent,
    UpdetePricePolicyComponent,
    PopupExcelComponent,
    EditPricePolicyComponent,
    ViewPricePolicyComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],
})
export class SalesModule {}
