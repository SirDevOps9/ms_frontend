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
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: '',
        component: LandingPageComponent,
        data: {
          moduleId: Modules.Finance,
        },
      },
      {
        path: 'masterdata',
        loadChildren: () => import('./modules/finance/finance.module').then((m) => m.FinanceModule),
      },
      {
        path: 'transcations',
        loadChildren: () => import('./modules/transcations/transcations.module').then((m) => m.TranscationsModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('./modules/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
