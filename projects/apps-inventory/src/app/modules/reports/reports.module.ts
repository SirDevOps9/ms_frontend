import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './pages/item-card/item-card.component';
import { Modules, SharedLibModule } from 'shared-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Route, RouterModule } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {
        path: '',
        component: ItemCardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ItemCardComponent],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
})
export class ReportsModule {}
