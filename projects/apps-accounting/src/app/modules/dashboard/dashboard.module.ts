import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { Modules, SharedLibModule } from 'shared-lib';
import { AccountingDashboardComponent } from './pages/accounting-dashboard/accounting-dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { LayoutPageComponent } from 'apps-shared-lib';
import { ChartCardComponent } from './components/chart-card/chart-card.component';

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
        component: AccountingDashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AccountingDashboardComponent, ChartCardComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes), ChartModule],
})
export class DashboardModule {}
