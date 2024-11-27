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
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'masterdata',
        loadChildren: () => import('./modules/items/items.module').then((m) => m.ItemsModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
