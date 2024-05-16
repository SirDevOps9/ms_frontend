import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { ChatOfAccountListComponent } from './pages/chat-of-account-list/chat-of-account-list.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MainChartOfAccountComponent } from './pages/main-chart-of-account/main-chart-of-account.component';
import { ChartOfAccountTreeComponent } from './pages/chart-of-account-tree/chart-of-account-tree.component';
import { ViewChartComponent } from './components/view-chart/view-chart.component';
import { AddChartComponent } from './components/add-chart/add-chart.component';
import { EditChartComponent } from './components/edit-chart/edit-chart.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'ChartOfAccount',
        component:MainChartOfAccountComponent ,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.chart_of_account,
        },
        children:[
          {
            path: 'add',
            component:AddChartComponent ,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.chart_of_account,
            },
          }
        ]
      }
    ],
  },
];

@NgModule({
  declarations: [
    ChatOfAccountListComponent,
    MainChartOfAccountComponent,
    ChartOfAccountTreeComponent,
    ViewChartComponent,
    AddChartComponent,
    EditChartComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class AccountModule {}
