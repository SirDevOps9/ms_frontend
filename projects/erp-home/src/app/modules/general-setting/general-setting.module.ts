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
import { VendorDefinitionsListComponent } from './pages/vendor-definitions/vendor-definitions-list/vendor-definitions-list.component';
import { AddVendorDefinitionsComponent } from './pages/vendor-definitions/add-vendor-definitions/add-vendor-definitions.component';
import { EditVendorDefinitionsComponent } from './pages/vendor-definitions/edit-vendor-definitions/edit-vendor-definitions.component';
import { CurrencyDefinitionComponent } from './pages/currencyDefinition/currency-definition/currency-definition.component';
import { AddCurrencyDefinitionComponent } from './components/currencyDefinition/add-currency-definition/add-currency-definition.component';
import { EditCurrencyDefinitionComponent } from './components/currencyDefinition/edit-currency-definition/edit-currency-definition.component';
import { CurrencyConversionComponent } from './pages/currency-conversion/currency-conversion.component';
import { AddCurrencyConversionComponent } from './components/currencyConversion/add-currency-conversion/add-currency-conversion.component';
import { EditCurrencyConversionComponent } from './components/currencyConversion/edit-currency-conversion/edit-currency-conversion.component';


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
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },
      {
        path: 'tags',
        component: TagListComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },
      {
        path: 'financial-calendar',
        component: FinancialCalendarListComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
      },
      {
        path: 'financial-calendar/add-financial-calendar',
        component: CreateFinancialCalendarComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
      },
      {
        path: 'financial-calendar/edit-financial-calendar/:id',
        component: EditFinancialCalendarComponent,
        // canActivate: [AuthGuard],
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
      
      {
        path: '',
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CURRENCY_DEFINITION,
        },
        children:[
          {
            path: 'currency-definition',
            component: CurrencyDefinitionComponent,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.CURRENCY_DEFINITION_LIST,
            },
          },
       
        ]
      },
      {
        path: 'currency-conversion',
        component: CurrencyConversionComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CURRENCY_CONVERSION,
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
    VendorDefinitionsListComponent,
    AddVendorDefinitionsComponent,
    EditVendorDefinitionsComponent,
    CurrencyDefinitionComponent,
    AddCurrencyDefinitionComponent,
    EditCurrencyDefinitionComponent,
    CurrencyConversionComponent,
    AddCurrencyConversionComponent,
    EditCurrencyConversionComponent
    
    
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
})
export class GeneralSettingModule {}
