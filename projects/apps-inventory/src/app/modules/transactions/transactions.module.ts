import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, Pages, SharedLibModule } from 'shared-lib';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { EditStockInComponent } from './pages/stock-In/edit-stock-in/edit-stock-in.component';
import { MainStockInListComponentComponent } from './components/main-stock-in-list-component/main-stock-in-list-component.component';
import { StockInListComponent } from './pages/stock-In/stock-in-list/stock-in-list.component';
import { MultiSelectItemStockInComponent } from './components/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { TrackingStockInComponent } from './components/tracking-stock-in/tracking-stock-in.component';
import { AddStockInComponent } from './pages/stock-In/add-stock-in/add-stock-in.component';
import { ImportStockInComponent } from './components/import-stock-in/import-stock-in.component';
import { ScanParcodeStockInComponent } from './components/scan-parcode-stock-in/scan-parcode-stock-in.component';
import { MainStockOutComponent } from './pages/stock-out/main-stock-out/main-stock-out.component';
import { StockOutListComponent } from './pages/stock-out/stock-out-list/stock-out-list.component';
import { AddStockOutComponent } from './pages/stock-out/add-stock-out/add-stock-out.component';
import { EditStockOutComponent } from './pages/stock-out/edit-stock-out/edit-stock-out.component';
import { SearchItemPopUpComponent } from './components/stock-out/search-item-pop-up/search-item-pop-up.component';
import { ViewStockOutComponent } from './pages/stock-out/view-stock-out/view-stock-out.component';
import { ViewStockInComponent } from './pages/stock-In/view-stock-in/view-stock-in.component';

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
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.STOCKIN,
            },
          },
          {
            path: 'add-stock-in',
            component: AddStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_STOCKIN,
              pageTitle: BreadcrumbLabel.ADD_STOCKIN,

            },
          },
          {
            path: 'edit-stock-in/:id',
            component: EditStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_STOCKIN,
              pageTitle: BreadcrumbLabel.EDIT_STOCKIN,

            },
          },
          {
            path: 'view/:id',
            component: ViewStockInComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_STOCKIN,
              pageTitle: BreadcrumbLabel.VIEW_STOCKIN,

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
      {
        path: 'stock-out',
        component: MainStockOutComponent,
        data: {
          breadcrumb: BreadcrumbLabel.STOCKOUT,
          pageTitle: BreadcrumbLabel.STOCKOUT,
        },
        children: [
          {
            path: '',
            component: StockOutListComponent,
            data: {
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.STOCKOUT,
            },
          },
          {
            path: 'add',
            component: AddStockOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_STOCKOUT,
              pageTitle: BreadcrumbLabel.TITLE_ADD_STOCKOUT,
            },
          },
          {
            path: 'edit/:id',
            component: EditStockOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.EDIT_STOCKOUT,
              pageTitle: BreadcrumbLabel.TITLE_EDIT_STOCKOUT,
            },
          },
          {
            path: 'sequence',
            component: SequenceComponent,
            data: {
              moduleId: Modules.inventory,
              pageId: Pages.StockOut,
              breadcrumb: BreadcrumbLabel.SEQUENCE,
              pageTitle: BreadcrumbLabel.SEQUENCE,
            },
          },
          {
            path: 'view/:id',
            component: ViewStockOutComponent,
            data: {
              breadcrumb: BreadcrumbLabel.VIEW_STOCKOUT,
              pageTitle: BreadcrumbLabel.VIEW_STOCKOUT,
            },
          }
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TrackingStockInComponent,
    MultiSelectItemStockInComponent,
    ScanParcodeStockInComponent,
    ImportStockInComponent,
    EditStockInComponent,
    MainStockInListComponentComponent,
    StockInListComponent ,
    AddStockInComponent,
    MainStockOutComponent,
    StockOutListComponent,
    EditStockOutComponent,
    AddStockOutComponent,
    SearchItemPopUpComponent,
    ViewStockOutComponent,
    ViewStockInComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule, ZXingScannerModule],
})
export class TransactionsModule {}
