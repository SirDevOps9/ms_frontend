import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
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
        path: '',
        component: DashboardComponent,
        data: {
          breadcrumb: BreadcrumbLabel.DASHBOARD,
          pageTitle: BreadcrumbLabel.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
