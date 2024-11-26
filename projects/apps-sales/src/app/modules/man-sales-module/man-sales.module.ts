import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainListTeamComponent } from './pages/main-sales-team/main-list-team/main-list-team.component';
import { AddMainTeamComponent } from './pages/main-sales-team/add-main-team/add-main-team.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { Modules, BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MainListComponent } from './pages/main-sales-team/main-list/main-list.component';
import { AddManPopupComponent } from './components/add-man-popup/add-man-popup.component';
import { MainManComponent } from './pages/main-man-component/app-main-man-component';
import { ManDetailsComponent } from './pages/main-man-component/man-details/man-details.component';
import { ManListComponent } from './pages/main-man-component/man-list/man-list.component';
import { ManageInformationForManComponent } from './pages/main-man-component/man-details/manage-information-for-man/manage-information-for-man.component';
import { ChangeSalesPhoneNumberComponent } from './components/change-sales-phone-number/change-sales-phone-number.component';
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
        path: 'main-team-sales',
        component: MainListComponent,
        data: {
          breadcrumb: BreadcrumbLabel.MAIN_SALES,
          pageTitle: BreadcrumbLabel.MAIN_SALES,
        },
        children: [
          {
            path: '',
            component: MainListTeamComponent,
            data: {
              breadcrumb: '',
              pageTitle: BreadcrumbLabel.MAIN_SALES,
            },
          },
          {
            path: 'add',
            component: AddMainTeamComponent,
            data: {
              breadcrumb: BreadcrumbLabel.ADD_MAin_SALES,
              pageTitle: BreadcrumbLabel.ADD_MAin_SALES,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainListTeamComponent,
    AddMainTeamComponent,
    ManListComponent,
    MainListComponent,
    MainManComponent,
    AddManPopupComponent,
    ManDetailsComponent,
    ManageInformationForManComponent,
    ChangeSalesPhoneNumberComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedLibModule],

  // exports: [
  //   MainListTeamComponent,
  //   AddMainTeamComponent,
  //   ManListComponent,
  //   MainListComponent,
  // ],
})
export class ManSalesModule {}
