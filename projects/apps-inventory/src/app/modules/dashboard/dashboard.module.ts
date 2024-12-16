import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDashboardComponent } from './inventory-dashboard.component';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.inventory,
    },
    children: [
      {
        path: '',
        component: InventoryDashboardComponent,
        data: {
          breadcrumb: BreadcrumbLabel.DASHBOARD,
          pageTitle: BreadcrumbLabel.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [InventoryDashboardComponent],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
