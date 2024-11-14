import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
import { Modules, SharedLibModule } from 'shared-lib';

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
        component: LandingPageComponent,
        data: {
          moduleId: Modules.inventory,
        },
      },
      {
        path: 'masterdata',
        loadChildren: () =>
          import('./modules/items/items.module').then((m) => m.ItemsModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
