import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, SequenceComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, Pages, SharedLibModule } from 'shared-lib';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ImportStockInComponent } from './components/import-stock-in/import-stock-in.component';
import { MainStockInListComponentComponent } from './components/main-stock-in-list-component/main-stock-in-list-component.component';
import { ScanParcodeStockInComponent } from './components/scan-parcode-stock-in/scan-parcode-stock-in.component';
import { AddStockInComponent } from './pages/stock-In/add-stock-in/add-stock-in.component';
import { MultiSelectItemStockInComponent } from './pages/stock-In/add-stock-in/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { TrackingStockInComponent } from './pages/stock-In/add-stock-in/tracking-stock-in/tracking-stock-in.component';
import { StockInListComponent } from './pages/stock-In/stock-in-list/stock-in-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {path: 'stock-in',
      component: MainStockInListComponentComponent,
      data: {
        breadcrumb: BreadcrumbLabel.STOCKIN,
        pageTitle : BreadcrumbLabel.STOCKIN
      },
 
      children: [
        {
          path: '',
          component: StockInListComponent,
          data: {
            breadcrumb: BreadcrumbLabel.STOCKIN,
            pageTitle : BreadcrumbLabel.STOCKIN
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
          path: 'sequence',
          component: SequenceComponent,
          data: {
            moduleId: Modules.inventory,
            pageId: Pages.StockIn,
            breadcrumb: BreadcrumbLabel.SEQUENCE,
            pageTitle: BreadcrumbLabel.SEQUENCE
          },
        },
      ],
    
    

  }


    
]
  }
]
  
@NgModule({
  declarations: [
    TrackingStockInComponent, 
    MultiSelectItemStockInComponent,
    ScanParcodeStockInComponent,
    ImportStockInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), SharedLibModule ,     ZXingScannerModule
  ]
})
export class TransactionsModule { }
