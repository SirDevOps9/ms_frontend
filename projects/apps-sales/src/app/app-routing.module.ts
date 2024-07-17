import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
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
        loadChildren: () => import('./modules/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('./modules/sales/sales.module').then((m) => m.SalesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
