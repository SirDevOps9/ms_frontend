import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReportComponent } from './pages/customer-report/customer-report.component';
import { Route, RouterModule } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      {
        path: 'customer-statement-report',
        component: CustomerReportComponent,
        data: {
          breadcrumb: BreadcrumbLabel.CUSTOMER_STATEMENT_REPORT,
          pageTitle: BreadcrumbLabel.CUSTOMER_STATEMENT_REPORT,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [CustomerReportComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class ReportsModule {}
