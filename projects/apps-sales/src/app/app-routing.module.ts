import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { Modules } from 'shared-lib';
export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'masterdata',
        loadChildren: () => import('./modules/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'transaction',
        loadChildren: () => import('./modules/transaction/transaction.module').then((m) => m.TransactionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
