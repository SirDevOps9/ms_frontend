import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { ChatOfAccountListComponent } from './pages/chart-of-account/chat-of-account-list/chat-of-account-list.component';
import { BreadcrumbLabel, Modules, MultiTranslateHttpLoader, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MainChartOfAccountComponent } from './pages/chart-of-account/main-chart-of-account/main-chart-of-account.component';
import { ChartOfAccountTreeComponent } from './pages/chart-of-account/chart-of-account-tree/chart-of-account-tree.component';
import { ChartOfAccountConfigurationComponent } from './components/chart-of-account-configuration/chart-of-account-configuration.component';
import { ViewChartComponent } from './components/view-chart/view-chart.component';
import { AddChartComponent } from './components/add-chart/add-chart.component';
import { EditChartComponent } from './components/edit-chart/edit-chart.component';
import { TaxDefinitionComponent } from './pages/taxs/tax-definition/tax-definition.component';
import { TaxGroupComponent } from './pages/taxs/tax-group/tax-group.component';
import { TaxDefinitionAddComponent } from './components/tax-definition-add/tax-definition-add.component';
import { TaxDefinitionEditComponent } from './components/tax-definition-edit/tax-definition-edit.component';
import { TaxGroupAddComponent } from './components/tax-group-add/tax-group-add.component';
import { TaxGroupEditComponent } from './components/tax-group-edit/tax-group-edit.component';
import { MainCostCenterComponent } from './pages/cost-center/main-cost-center/main-cost-center.component';
import { CostCenterListComponent } from './pages/cost-center/cost-center-list/cost-center-list.component';
import { CostCenterTreeComponent } from './pages/cost-center/cost-center-tree/cost-center-tree.component';
import { AddCostCenterComponent } from './pages/cost-center/add-cost-center/add-cost-center.component';
import { EditCostCenterComponent } from './pages/cost-center/edit-cost-center/edit-cost-center.component';
import { ViewCostCenterComponent } from './pages/cost-center/view-cost-center/view-cost-center.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: 'chartofaccounts',
        component: MainChartOfAccountComponent,
        canActivate: [AuthGuard],
        data:{
          breadcrumb: BreadcrumbLabel.chart_of_account,
         },
          
     
      
        children: [
          {
            path: 'add',
            component: AddChartComponent,
            canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.chart_of_account,
            },
          },
        ],
      },
      {
        path: 'tax-group',
        component: TaxGroupComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TAXS_GROUP,
        },
      },
      {
        path: 'tax-definition',
        component: TaxDefinitionComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TAXS_DEFINITION,
        },
      }
      ,
      {
        path: 'cost-center',
        component: MainCostCenterComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.COST_CENTER,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [
    ChatOfAccountListComponent,
    MainChartOfAccountComponent,
    ChartOfAccountTreeComponent,
    ChartOfAccountConfigurationComponent,
    ViewChartComponent,
    AddChartComponent,
    EditChartComponent,
    TaxGroupComponent,
    TaxDefinitionComponent,
    TaxDefinitionAddComponent,
    TaxDefinitionEditComponent,
    TaxGroupAddComponent,
    TaxGroupEditComponent,
    MainCostCenterComponent,
    CostCenterListComponent,
    CostCenterTreeComponent,
    AddCostCenterComponent,
    EditCostCenterComponent,
    ViewCostCenterComponent
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
})
export class AccountModule {}
