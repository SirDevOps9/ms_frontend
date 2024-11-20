import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './pages/item-card/item-card.component';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Route, RouterModule } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { SearchItemAdvancedPopUpComponent } from './components/search-item-pop-up/search-item-pop-up.component';
import { SpinnerComponent } from './components/search-item-pop-up/spinner/spinner.component';
import { LoaderDirective } from './directives/loader.directive';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {
        path: 'item-card',
        component: ItemCardComponent,
        data: {
          breadcrumb: BreadcrumbLabel.ITEM_CARD_REPORT,
          pageTitle: BreadcrumbLabel.ITEM_CARD_REPORT,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ItemCardComponent,
    SearchItemAdvancedPopUpComponent,
    SpinnerComponent,
    LoaderDirective,
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
  exports: [LoaderDirective],
})
export class ReportsModule {}
