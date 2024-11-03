import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  breadCrumbHome,
  BreadcrumbLabel,
  LayoutComponent,
  Modules,
  SharedLibModule,
} from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { AddItemCategoryComponent } from './components/add-item-category/add-item-category.component';
import { ItemCategoryListComponent } from './pages/item-category/item-category-list/item-category-list.component';
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
import { ViewItemDefinitionComponent } from './components/view-item-definition/view-item-definition/view-item-definition.component';
import { AddWarehousePopupComponent } from './components/warehouse/add-warehouse-popup/add-warehouse-popup.component';
import { AddAttributeDefinitionComponent } from './pages/attribute-definition/add-attribute-definition/add-attribute-definition.component';
import { AttributeDefinitionListComponent } from './pages/attribute-definition/attribute-definition-list/attribute-definition-list.component';
import { AttributeDefinitionComponent } from './pages/attribute-definition/attribute-definition.component';
import { EditAttributeDefinitionComponent } from './pages/attribute-definition/edit-attribute-definition/edit-attribute-definition.component';
import { AddItemsCategoryComponent } from './pages/item-categories-tree/add-items-category/add-items-category.component';
import { EditItemCategoryComponent } from './pages/item-categories-tree/edit-item-category/edit-item-category.component';
import { ItemsCategoryTreeComponent } from './pages/item-categories-tree/items-category-tree/items-category-tree.component';
import { MainItemCategoriesTreeComponent } from './pages/item-categories-tree/main-item-categories-tree/main-item-categories-tree.component';
import { ViewItemCategoryComponent } from './pages/item-categories-tree/view-item-category/view-item-category.component';
import { OperationTagAddComponent } from './pages/operational-tag/operation-tag-add/operation-tag-add.component';
import { OperationTagEditComponent } from './pages/operational-tag/operation-tag-edit/operation-tag-edit.component';
import { OperationTagListComponent } from './pages/operational-tag/operation-tag-list/operation-tag-list.component';
import { OperationTagMainComponent } from './pages/operational-tag/operation-tag-main/operation-tag-main.component';
import { AddStockInComponent } from './pages/stock-In/add-stock-in/add-stock-in.component';
import { StockInListComponent } from './pages/stock-In/stock-in-list/stock-in-list.component';
import { EditWarehouseComponent } from './pages/warehouse/edit-warehouse/edit-warehouse.component';
import { MainWarehouseComponent } from './pages/warehouse/main-warehouse/main-warehouse.component';
import { MainStockInListComponentComponent } from './pages/stock-In/main-stock-in-list-component/main-stock-in-list-component.component';
import { ItemDefinitionGeneralComponent } from './pages/item-definition/item-definition-general/item-definition-general.component';
import { ItemDefinitionUomComponent } from './pages/item-definition/item-definition-uom/item-definition-uom.component';
import { ItemDefinitionAttributesVariantsComponent } from './pages/item-definition/item-definition-attributes-variants/item-definition-attributes-variants.component';
import { ItemDefinitionBarcodeComponent } from './pages/item-definition/item-definition-barcode/item-definition-barcode.component';
import { ItemDefinitionInventoryComponent } from './pages/item-definition/item-definition-inventory/item-definition-inventory.component';
import { ItemCatalogTabsComponent } from './pages/item-definition/item-catalog-tabs/item-catalog-tabs.component';
import { EditCategoryUomComponent } from './pages/item-definition/item-definition-uom/edit-category/edit-category-uom/edit-category-uom.component';
import { ItemDefintionVatComponent } from './pages/item-definition/item-defintion-vat/item-defintion-vat.component';
import { ItemDefintionTaxComponent } from './pages/item-definition/item-defintion-tax/item-defintion-tax.component';

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
          pageTitle : BreadcrumbLabel.ITEM_DIFINITION

        },
      },
      {
        path: 'item-definition',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,
        pageTitle : BreadcrumbLabel.ITEM_DIFINITION

        },
      },
      {
        path: 'add-item-definition',
        component: ItemCatalogTabsComponent,
        data: {
          breadcrumb: '',
          pageTitle : BreadcrumbLabel.EDIT_ITEM_DIFINITION

        },
        children: [
          {
            path: 'general/:id',
            component: ItemDefinitionGeneralComponent,
            data: {
              breadcrumb: BreadcrumbLabel.GENERAL_ITEMdEFINITION,
              pageTitle : BreadcrumbLabel.GENERAL_ITEMdEFINITION
            },
          },
          {
            path: 'uom/:id',
            component: ItemDefinitionUomComponent,
            data: {
              breadcrumb: BreadcrumbLabel.attributes_ITEMdEFINITION,
              pageTitle : BreadcrumbLabel.attributes_ITEMdEFINITION
            },
          },
          {
            path: 'variants/:id',
            component: ItemDefintionVatComponent,
            data: {
              breadcrumb: BreadcrumbLabel.attributes_ITEMdEFINITION,
              pageTitle : BreadcrumbLabel.attributes_ITEMdEFINITION
            },
          },
          {
            path: 'attributes-variants/:id',
            component: ItemDefinitionAttributesVariantsComponent,
            data: {
              breadcrumb: BreadcrumbLabel.attributes_ITEMdEFINITION,
              pageTitle : BreadcrumbLabel.attributes_ITEMdEFINITION
            },
          },
          {
            path: 'barcode/:id',
            component: ItemDefinitionBarcodeComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EditItembarcodedefinition,
              pageTitle : BreadcrumbLabel.EditItembarcodedefinition
            },
          },

          {
            path: 'tax/:id',
            component: ItemDefintionTaxComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EditItembarcodedefinition,
              pageTitle : BreadcrumbLabel.EditItembarcodedefinition
            },
          },
        ],

      },
      {
        path: 'warehouse',
        component: MainWarehouseComponent,
        data: {
          breadcrumb: '',
        },
        children: [
          {
            path: '',
            component: WarehouseListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.WARE_HOUSE,
              pageTitle : BreadcrumbLabel.WARE_HOUSE
            },
          },
          {
            path: 'add-warehouse',
            component: AddWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_WARE_HOUSE,
              pageTitle : BreadcrumbLabel.ADD_WARE_HOUSE

            },
          },
          {
            path: 'edit-warehouse/:id',
            component: EditWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_WARE_HOUSE,
              pageTitle : BreadcrumbLabel.EDIT_WARE_HOUSE

            },
          },
        ],
      },
      {
        path: 'uom',
        component: UOMMainComponent,
        data: {
          breadcrumb: BreadcrumbLabel.UNITOFMEASURE
        },
        children: [
          {
            path: '',
            component: UOMListComponent,
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-uom',
            component: UOMAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_UOM,
            },
          },
          {
            path: 'edit-uom/:id',
            component: UOMEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_UOM,
            },
          },
        ],
      },

      {
        path: 'operational-tag',
        component: OperationTagMainComponent,
        data: { breadcrumb: BreadcrumbLabel.Operational_Tag },
        children: [
          {
            path: '',
            component: OperationTagListComponent,
            data: { breadcrumb: '' },
          },
          {
            path: 'add-operational-tag',
            component: OperationTagAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Add_Operational_Tag,
            },
          },
          {
            path: 'edit-operational-tag/:id',
            component: OperationTagEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_Operational_Tag,
            },
          },
        ],
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
      {
        path: 'items-category',
        component: MainItemCategoriesTreeComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEMS_CATEGORY,
          pageTitle : BreadcrumbLabel.ITEMS_CATEGORY

        },
      },
      {
        path: 'stock-in',
        component: MainStockInListComponentComponent,
        data: {
          breadcrumb: BreadcrumbLabel.STOCKIN,
        },
        children: [
          {
            path: '',
            component: StockInListComponent,
            data: { breadcrumb: '' },
          },
          {
            path: 'add-stock-in',
            component: AddStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_STOCKIN,
            },
          },
          {
            path: 'add-item-definition/:id',
            component: ItemCatalogTabsComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_ITEM_DIFINITION,
            },
          },
        ],
      },


      {
        path: 'item-category',
        component: ItemCategoryListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_CATEGORY,
        },
      },
    ],
  },
];
@NgModule({
  declarations: [
    ItemDefinitionListComponent,
    ItemCatalogTabsComponent,
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
    ViewItemDefinitionComponent,
    MainStockInListComponentComponent,
    ItemDefinitionGeneralComponent,
    ItemDefinitionUomComponent,
    ItemDefinitionAttributesVariantsComponent,
    ItemDefinitionBarcodeComponent,
    ItemDefinitionInventoryComponent,
    EditCategoryUomComponent,
    ItemDefintionVatComponent,
    ItemDefintionTaxComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule ],
})
export class ItemsModule {}
