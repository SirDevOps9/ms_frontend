import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbLabel, LayoutComponent, Modules, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { AddItemCategoryComponent } from './components/add-item-category/add-item-category.component';
import { ItemCategoryListComponent } from './pages/item-category/item-category-list/item-category-list.component';
import { ItemTypeListComponent } from './pages/item-type/item-type-list/item-type-list.component';
import { AddItemDefinitionComponent } from './pages/item-definition/save-Item-definition/add-item-definition.component';
import { AddItemDefinitionPopupComponent } from './components/add-item-definition/add-item-definition-popup.component';
import { ItemDefinitionListComponent } from './pages/item-definition/item-definition-list/item-definition-list.component';
import { EditItemDefinitionComponent } from './components/edit-item-definition/edit-item-definition.component';
import { AddVariantPopupComponent } from './components/add-variant-popup/add-variant-popup.component';
import { ViewVariantPopupComponent } from './components/view-variant-popup/view-variant-popup.component';
import { AddBarcodePopupComponent } from './components/add-barcode-popup/add-barcode-popup.component';
import { ViewQRcodeComponent } from './components/view-qrcode/view-qrcode.component';
import { WarehouseListComponent } from './pages/warehouse/warehouse-list/warehouse-list.component';
import { AddWarehouseComponent } from './pages/warehouse/add-warehouse/add-warehouse.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children : [
      {
        path: '',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,
        },
      },
      {
        path: 'item-definition',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION
        },
     
      },
      {
        path: 'warehouse',
        component: WarehouseListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.WARE_HOUSE
        },
     
      },
      {
        path: 'add-warehouse',
        component: AddWarehouseComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ADD_WARE_HOUSE
        },
     
      },
      {
        path: 'add-item-definition/:id',
        component: AddItemDefinitionComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ADD_ITEM_DIFINITION
        },
     
      },
      {
        path: 'item-type',
        component: ItemTypeListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_TYPE
        },
     
      },
      {
        path: 'item-category',
        component: ItemCategoryListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_CATEGORY
        },
     
      },
     
    ]

  }
      
    
]

@NgModule({
  declarations: [
    ItemDefinitionListComponent,
    AddItemDefinitionComponent,
    ItemTypeListComponent,
    ItemCategoryListComponent,
    AddItemCategoryComponent,
    AddItemDefinitionPopupComponent,
    EditItemDefinitionComponent,
    AddVariantPopupComponent,
    ViewVariantPopupComponent,
    AddBarcodePopupComponent,
    ViewQRcodeComponent,
    WarehouseListComponent,
    AddWarehouseComponent
  ],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
     SharedLibModule
  ]
})
export class ItemsModule { }
