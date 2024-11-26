import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MainSalesTeamComponent } from './pages/main-sales-team/main-sales-team-component/main-sales-team.component';
import { AddManPopupComponent } from './components/add-man-popup/add-man-popup.component';
import { MainManComponent } from './pages/main-man-component/app-main-man-component';
import { ManDetailsComponent } from './pages/main-man-component/man-details/man-details.component';
import { ManListComponent } from './pages/main-man-component/man-list/man-list.component';
import { ManageInformationForManComponent } from './pages/main-man-component/man-details/manage-information-for-man/manage-information-for-man.component';
import { ChangeSalesPhoneNumberComponent } from './components/change-sales-phone-number/change-sales-phone-number.component';
import { ListSalesTeamComponent } from './pages/main-sales-team/list-sales-team/list-sales-team.component';
import { SalesTeamDetailsComponent } from './pages/main-sales-team/sales-team-details/sales-team-details.component';
import { SalesTeamGeneralInfoComponent } from './pages/main-sales-team/sales-team-details/sales-team-general-info/sales-team-general-info.component';
import { ViewMenInTeamComponent } from './components/view-men-in-team/view-men-in-team.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Sales,
    },
    children: [
      {
        path: 'sales-man',
        component: MainManComponent,
        data: {
          breadcrumb: BreadcrumbLabel.MAN_SALES,
          pageTitle: BreadcrumbLabel.MAN_SALES,
        },
        children: [
          {
            path: '',
            component: ManListComponent,
            data: {
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.MAN_SALES,
            },
          },
          {
            path: 'details/:id',
            component: ManDetailsComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_MAN_SALES,
              pageTitle: BreadcrumbLabel.ADD_MAN_SALES,
            },
          },
        ],
      },

      {
        path: 'sales-team',
        component: MainSalesTeamComponent,
        data: {
          breadcrumb: BreadcrumbLabel.TEAM_SALES,
          pageTitle: BreadcrumbLabel.TEAM_SALES,
        },
        children: [
          {
            path: '',
            component: ListSalesTeamComponent,
            data: {
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.TEAM_SALES,
            },
          },

          {
            path: 'add',
            component: SalesTeamDetailsComponent,
            data: {
              breadcrumb: BreadcrumbLabel.SALES_TEAM_DETAILS,
              pageTitle: BreadcrumbLabel.SALES_TEAM_DETAILS,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ListSalesTeamComponent,
    ManListComponent,
    MainSalesTeamComponent,
    MainManComponent,
    AddManPopupComponent,
    ManDetailsComponent,
    ManageInformationForManComponent,
    ChangeSalesPhoneNumberComponent,
    SalesTeamDetailsComponent,
    SalesTeamGeneralInfoComponent,
    ViewMenInTeamComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],

  // exports: [
  //   ListSalesTeamComponent,
  //   AddMainTeamComponent,
  //   ManListComponent,
  //   MainListComponent,
  // ],
})
export class ManSalesModule {}
