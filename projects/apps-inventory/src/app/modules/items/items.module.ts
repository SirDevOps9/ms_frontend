import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { breadCrumbHome, BreadcrumbLabel, LayoutComponent, Modules, SharedLibModule } from 'shared-lib';
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
import { UOMListComponent } from './pages/unit-of-major/uom-list/uom-list.component';
import { UOMAddComponent } from './pages/unit-of-major/uom-add/uom-add.component';
import { UOMEditComponent } from './pages/unit-of-major/uom-edit/uom-edit.component';
import { UOMMainComponent } from './pages/unit-of-major/UOM-main/UOM-main.component';
import { AttributeDefinitionComponent } from './pages/attribute-definition/attribute-definition.component';
import { AttributeDefinitionListComponent } from './pages/attribute-definition/attribute-definition-list/attribute-definition-list.component';
import { AddAttributeDefinitionComponent } from './pages/attribute-definition/add-attribute-definition/add-attribute-definition.component';
import { EditAttributeDefinitionComponent } from './pages/attribute-definition/edit-attribute-definition/edit-attribute-definition.component';
import { OperationTagMainComponent } from './pages/operational-tag/operation-tag-main/operation-tag-main.component';
import { OperationTagAddComponent } from './pages/operational-tag/operation-tag-add/operation-tag-add.component';
import { OperationTagListComponent } from './pages/operational-tag/operation-tag-list/operation-tag-list.component';
import { OperationTagEditComponent } from './pages/operational-tag/operation-tag-edit/operation-tag-edit.component';
import { ItemsCategoryTreeComponent } from './pages/item-categories-tree/items-category-tree/items-category-tree.component';
import { AddItemsCategoryComponent } from './pages/item-categories-tree/add-items-category/add-items-category.component';
import { EditItemCategoryComponent } from './pages/item-categories-tree/edit-item-category/edit-item-category.component';
import { ViewItemCategoryComponent } from './pages/item-categories-tree/view-item-category/view-item-category.component';
import { EditWarehouseComponent } from './pages/warehouse/edit-warehouse/edit-warehouse.component';
import { MainItemCategoriesTreeComponent } from './pages/item-categories-tree/main-item-categories-tree/main-item-categories-tree.component';
import { AddWarehousePopupComponent } from './components/warehouse/add-warehouse-popup/add-warehouse-popup.component';
import { StockInListComponent } from './pages/stock-In/stock-in-list/stock-in-list.component';
import { AddStockInComponent } from './pages/stock-In/add-stock-in/add-stock-in.component';
import { MainWarehouseComponent } from './pages/warehouse/main-warehouse/main-warehouse.component';
import { ViewAttributeDetalisComponent } from './pages/attribute-definition/view-attribute-detalis/view-attribute-detalis/view-attribute-detalis.component';
import {MatDialogModule} from '@angular/material/dialog';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {
        path: '',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,
          pageTitle: BreadcrumbLabel. ITEM_DIFINITION,
        },
      },
      {
        path: 'item-definition',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,
          pageTitle: BreadcrumbLabel. ITEM_DIFINITION,
        },

      },
      {
        path: 'warehouse',
        component: MainWarehouseComponent,
        data: {
          breadcrumb: BreadcrumbLabel.WARE_HOUSE
        },
        children : [
          {
            path: '',
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
            path: 'edit-warehouse/:id',
            component: EditWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_WARE_HOUSE
            },
         
          },
        ]
     
      },
      {
        path: 'items-category',
        component: MainItemCategoriesTreeComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEMS_CATEGORY
        },
     
      },
      {
        path: 'stock-in',
        component: StockInListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.STOCKIN
        },
     
      },
      {
        path: 'add-stock-in',
        component: AddStockInComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ADD_STOCKIN
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
      {
        path: 'attribute-definition',
        component: AttributeDefinitionComponent,
        data: { breadcrumb: BreadcrumbLabel.Attribute_Definition },
        children: [
          {
            path: '',
            component: AttributeDefinitionListComponent,
            data: { breadcrumb: '' },
          },
          {
            path: 'add-attribute',
            component: AddAttributeDefinitionComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Add_Attribute_Definition,
            },
          },
          {
            path: 'edit-attribute/:id',
            component: EditAttributeDefinitionComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_Attribute_Definition,
            },
          },
        ],
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
    AddWarehouseComponent,
    UOMMainComponent,
    UOMListComponent,
    UOMAddComponent,
    UOMEditComponent,
    AttributeDefinitionComponent,
    AttributeDefinitionListComponent,
    AddAttributeDefinitionComponent,
    EditAttributeDefinitionComponent,
    OperationTagMainComponent,
    OperationTagListComponent,
    OperationTagAddComponent,
    OperationTagEditComponent,
    ItemsCategoryTreeComponent,
    AddItemsCategoryComponent,
    EditItemCategoryComponent,
    ViewItemCategoryComponent,
    EditWarehouseComponent,
    MainItemCategoriesTreeComponent,
    AddWarehousePopupComponent,
    StockInListComponent,
    AddStockInComponent,
    MainWarehouseComponent,
    ViewAttributeDetalisComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedLibModule,
    MatDialogModule
  ],
  
})
export class ItemsModule { }
