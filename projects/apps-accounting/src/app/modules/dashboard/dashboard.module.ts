import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AccountingDashboardComponent } from './pages/accounting-dashboard/accounting-dashboard.component';
import { LayoutPageComponent } from 'apps-shared-lib';

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
          pageTitle: BreadcrumbLabel.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [AccountingDashboardComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
