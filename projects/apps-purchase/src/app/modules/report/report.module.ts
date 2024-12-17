import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorReportComponent } from './components/vendor-report/vendor-report.component';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { Route, RouterModule } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';

const routes: Route[] = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Purchase,
    },
    children: [
      {
        path: 'vendor-reports',
        component: VendorReportComponent,
        data: {
          breadcrumb: BreadcrumbLabel.VENDOR_REPORT,
          pageTitle: BreadcrumbLabel.VENDOR_REPORT,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [VendorReportComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class ReportModule {}
