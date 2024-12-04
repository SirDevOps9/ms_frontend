import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { FinanceDashboardComponent } from './pages/finance-dashboard/finance-dashboard.component';
import { ChartModule } from 'angular-highcharts';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Finance,
    },
    children: [
      {
        path: '',
        component: FinanceDashboardComponent,
        data: {
          breadcrumb: BreadcrumbLabel.DASHBOARD,
          pageTitle: BreadcrumbLabel.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [FinanceDashboardComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes), ChartModule],
})
export class DashboardModule {}
