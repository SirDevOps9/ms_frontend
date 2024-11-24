import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { Modules } from 'shared-lib';

export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Purchase,
    },
    children: [
      {
        path: '',
        component: LandingPageComponent,
        data: {
          moduleId: Modules.Purchase,
        },
      },
      {
        path: 'masterdata',
        loadChildren: () =>
          import('./modules/purchase/purchase.module').then((m) => m.PurchaseModule),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./modules/purchase-transactions/purchase-transactions.module').then((m) => m.PurchaseTransactionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
