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
        path: 'uom', component: UOMMainComponent,
        data: { breadcrumb: BreadcrumbLabel.UOM }, children: [
          {
            path: '',
            component: UOMListComponent,
            data: {
              breadcrumb: ''
            },

          },
          {
            path: 'add-uom',
            component: UOMAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_UOM
            },

          },
          {
            path: 'edit-uom/:id',
            component: UOMEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_UOM
            },

          },
        ]
      },
      {
        path:'operational-tag', component: OperationTagMainComponent, data:{breadcrumb:BreadcrumbLabel.Operational_Tag },children:[
          {
            path: '', component: OperationTagListComponent,
            data: { breadcrumb: '' }
          },
          {
            path: 'add-operationa-tag',
            component: OperationTagAddComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Add_Operational_Tag
            },
          },
          {
            path: 'edit-operationa-tag/:id',
            component: OperationTagEditComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_Operational_Tag
            },
          }

        ]
      },
      {
        path: 'attribute-definition', component: AttributeDefinitionComponent,
        data: { breadcrumb: BreadcrumbLabel.Attribute_Definition }, children: [
          {
            path: '', component: AttributeDefinitionListComponent,
            data: { breadcrumb: '' }
          },
          {
            path: 'add-attribute',
            component: AddAttributeDefinitionComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Add_Attribute_Definition
            },

          },
          {
            path: 'edit-attribute/:id',
            component: EditAttributeDefinitionComponent,
            data: {
              breadcrumb: BreadcrumbLabel.Edit_Attribute_Definition
            },

          },


        ]
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
    OperationTagAddComponent,
    OperationTagEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedLibModule
  ]
})
export class ItemsModule { }
