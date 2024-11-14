import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, Pages, SharedLibModule } from 'shared-lib';
import { ItemCatalogTabsComponent } from '../items/pages/item-definition/item-catalog-tabs/item-catalog-tabs.component';
import { AddStockInComponent } from '../items/pages/stock-In/add-stock-in/add-stock-in.component';
import { MainStockInListComponentComponent } from '../items/pages/stock-In/main-stock-in-list-component/main-stock-in-list-component.component';
import { StockInListComponent } from '../items/pages/stock-In/stock-in-list/stock-in-list.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EditStockInComponent } from '../items/pages/stock-In/edit-stock-in/edit-stock-in.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {
        path: 'stock-in',
        component: MainStockInListComponentComponent,
        data: {
          breadcrumb: BreadcrumbLabel.STOCKIN,
          pageTitle: BreadcrumbLabel.STOCKIN,
        },

        children: [
          {
            path: '',
            component: StockInListComponent,
            data: {
              breadcrumb: BreadcrumbLabel.STOCKIN,
              pageTitle: BreadcrumbLabel.STOCKIN,
            },
          },
          {
            path: 'add-stock-in',
            component: AddStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_STOCKIN,
            },
          },
          {
            path: 'edit-stock-in/:id',
            component: EditStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_STOCKIN,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.inventory,
              pageId: Pages.StockIn,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainStockInListComponentComponent,
    StockInListComponent,
    AddStockInComponent,
    EditStockInComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule, ZXingScannerModule],
})
export class TransactionsModule {}
