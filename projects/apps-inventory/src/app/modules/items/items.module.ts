import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  breadCrumbHome,
  BreadcrumbLabel,
  LayoutComponent,
  Modules,
  Pages,
  SharedLibModule,
} from 'shared-lib';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
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
import { EditWarehouseComponent } from './pages/warehouse/edit-warehouse/edit-warehouse.component';
import { MainWarehouseComponent } from './pages/warehouse/main-warehouse/main-warehouse.component';
import { ItemDefinitionGeneralComponent } from './pages/item-definition/item-definition-general/item-definition-general.component';
import { ItemDefinitionUomComponent } from './pages/item-definition/item-definition-uom/item-definition-uom.component';
import { ItemDefinitionAttributesVariantsComponent } from './pages/item-definition/item-definition-attributes-variants/item-definition-attributes-variants.component';
import { ItemDefinitionBarcodeComponent } from './pages/item-definition/item-definition-barcode/item-definition-barcode.component';
import { ItemDefinitionInventoryComponent } from './pages/item-definition/item-definition-inventory/item-definition-inventory.component';
import { ItemCatalogTabsComponent } from './pages/item-definition/item-catalog-tabs/item-catalog-tabs.component';
import { EditCategoryUomComponent } from './pages/item-definition/item-definition-uom/edit-category/edit-category-uom/edit-category-uom.component';
import { ItemDefintionTaxComponent } from './pages/item-definition/item-defintion-tax/item-defintion-tax.component';
import { WarehouseTabsComponent } from './pages/warehouse/warehouse-tabs/warehouse-tabs/warehouse-tabs.component';
import { AttributeDefinitionValuesComponent } from './pages/attribute-definition/attribute-definition-values/attribute-definition-values/attribute-definition-values.component';
import { AttributeDefinitionListValuesComponent } from './pages/attribute-definition/attribute-definition-list-values/attribute-definition-list-values/attribute-definition-list-values.component';
import { ItemDefintionVariantComponent } from './pages/item-definition/item-defintion-variants/item-defintion-variant.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ItemFixedCostComponent } from './pages/item-definition/item-fixed-cost/item-fixed-cost.component';
import { ViewWarehouseComponent } from './pages/warehouse/view-warehouse/view-warehouse.component';
import { UomViewComponent } from './pages/unit-of-major/uom-view/uom-view.component';
import { GeneralSettingInvComponent } from './pages/general-setting-inv/general-setting-inv.component';
import { HelpPageComponent } from 'libs/apps-shared-lib/src/lib/pages/help-page/components/view-help-page/help-page.component';

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
          pageTitle: BreadcrumbLabel.ITEM_DIFINITION,
        },
      },
      {
        path: 'item-definition',
        component: ItemDefinitionListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,
          pageTitle: BreadcrumbLabel.ITEM_DIFINITION,
        },
      },
      
      //{ path: 'help-page', component: HelpPageComponent } ,// Define route with parameter (e.g., 'id')

      {
        path: 'add-item-definition',
        component: ItemCatalogTabsComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_DIFINITION,

          pageTitle: BreadcrumbLabel.EDIT_ITEM_DIFINITION,
        },
        children: [
          {
            path: 'general/:id',
            component: ItemDefinitionGeneralComponent,
            data: {
              breadcrumb: BreadcrumbLabel.GENERAL_ITEMdEFINITION,
              pageTitle: BreadcrumbLabel.GENERAL_ITEMdEFINITION,
            },
          },
          {
            path: 'uom/:id',
            component: ItemDefinitionUomComponent,
            data: {
              breadcrumb: BreadcrumbLabel.attributes_ITEMdEFINITION,
              pageTitle: BreadcrumbLabel.attributes_ITEMdEFINITION,
            },
          },
          {
            path: 'variants/:id',
            component: ItemDefintionVariantComponent,
            data: {
              breadcrumb: BreadcrumbLabel.variants_ITEMdEFINITION,
              pageTitle: BreadcrumbLabel.variants_ITEMdEFINITION,
            },
          },
          {
            path: 'attributes/:id',
            component: ItemDefinitionAttributesVariantsComponent,
            data: {
              breadcrumb: BreadcrumbLabel.attributes_ITEMdEFINITION,
              pageTitle: BreadcrumbLabel.attributes_ITEMdEFINITION,
            },
          },
          {
            path: 'barcode/:id',
            component: ItemDefinitionBarcodeComponent,
            data: {
              breadcrumb: BreadcrumbLabel.TaxTilte,
              pageTitle: BreadcrumbLabel.TaxTilte,
            },
          },
          {
            path: 'fixed-cost/:id',
            component: ItemFixedCostComponent,
            data: {
              breadcrumb: BreadcrumbLabel.FIXEDCOST,
              pageTitle: BreadcrumbLabel.FIXEDCOST,
            },
          },

          {
            path: 'tax/:id',
            component: ItemDefintionTaxComponent,
            data: {
              breadcrumb: BreadcrumbLabel.TaxTilte,
              pageTitle: BreadcrumbLabel.TaxTilte,
            },
          },
          {
            path: 'inventory/:id',
            component: ItemDefinitionInventoryComponent,
            data: {
              breadcrumb: BreadcrumbLabel.INVENTORY,
              pageTitle: BreadcrumbLabel.INVENTORY,
            },
          },
        ],
      },
      {
        path: 'warehouse',
        component: MainWarehouseComponent,
        data: {
          breadcrumb: BreadcrumbLabel.WARE_HOUSE
        },
        children: [
          {
            path: '',
            component: WarehouseListComponent,
            data: {
              breadcrumb:'',
              pageTitle: BreadcrumbLabel.WARE_HOUSE,
            },
          },
          {
            path: 'add-warehouse',
            component: AddWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_WARE_HOUSE,
              pageTitle: BreadcrumbLabel.ADD_WARE_HOUSE,
            },
          },

          {
            path: 'edit-warehouse/:id',
            component: EditWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_WARE_HOUSE,
              pageTitle: BreadcrumbLabel.EDIT_WARE_HOUSE_TITLE,
            },
          },
          {
            path: 'view-warehouse/:id',
            component: ViewWarehouseComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_WARE_HOUSE,
              pageTitle: BreadcrumbLabel.EDIT_WARE_HOUSE,
            },
          },
        ],
      },
      {
        path: 'uom',
        component: UOMMainComponent,
        data: {
          breadcrumb: BreadcrumbLabel.UNITOFMEASURE,


        },
        children: [
          {
            path: '',
            component: UOMListComponent,
            data: {
              breadcrumb: '',
              pageTitle:  BreadcrumbLabel.UNITOFMEASURE,
            },
          },
          {
            path: 'add-uom',
            component: UOMAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_UOM,
              pageTitle: BreadcrumbLabel.ADD_UOM,
            },
          },
          {
            path: 'edit-uom/:id',
            component: UOMEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDITUOM,
              pageTitle: BreadcrumbLabel.EDITUOM,
            },
          },
          {
            path: 'view-uom/:id',
            component: UomViewComponent,
            data: {
              breadcrumb: BreadcrumbLabel.UOM_VIEW,
              pageTitle:  BreadcrumbLabel.UNITOFMEASURE,
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
          {
            path: 'view/:id',
            component: AttributeDefinitionListValuesComponent,
            data: {
              breadcrumb: BreadcrumbLabel.LIST_Attribute_Definition,
            },
          },
        ],
      },
      {
        path: 'items-category',
        component: MainItemCategoriesTreeComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEMS_CATEGORY,
          pageTitle: BreadcrumbLabel.ITEMS_CATEGORY,
        },
      },

      {
        path: 'item-category',
        component: ItemCategoryListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_CATEGORY,
          pageTitle: BreadcrumbLabel.ITEMS_CATEGORY,
        },
      },
      {
        path: 'general-setting',
        component: GeneralSettingInvComponent,
        data: {
          breadcrumb: BreadcrumbLabel.GENERAL_SETTING,
          pageTitle: BreadcrumbLabel.GENERAL_SETTING,
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
    MainWarehouseComponent,
    ViewItemDefinitionComponent,
    ItemDefinitionGeneralComponent,
    ItemDefinitionUomComponent,
    ItemDefinitionAttributesVariantsComponent,
    ItemDefinitionBarcodeComponent,
    ItemDefinitionInventoryComponent,
    EditCategoryUomComponent,
    ItemDefintionVariantComponent,
    ItemDefintionTaxComponent,
    WarehouseTabsComponent,
    AttributeDefinitionValuesComponent,
    AttributeDefinitionListValuesComponent,
    ItemFixedCostComponent,
    ViewWarehouseComponent,
    UomViewComponent,
    GeneralSettingInvComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedLibModule,
    ZXingScannerModule, // Add the ZXingScannerModule here
  ],
})
export class ItemsModule {}
