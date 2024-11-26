import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AccountingDashboardComponent } from './pages/accounting-dashboard/accounting-dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { LayoutPageComponent } from 'apps-shared-lib';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { DecimalSeperatorPipe } from './pipes/decimal-seperator.pipe';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: '',
        component: AccountingDashboardComponent,
        data: {
          breadcrumb: BreadcrumbLabel.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [AccountingDashboardComponent, ChartCardComponent, DecimalSeperatorPipe],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes), ChartModule],
})
export class DashboardModule {}
