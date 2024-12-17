import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { HelpPageComponent } from './components/view-help-page/help-page.component';
import { HomeHelpPageComponent } from './components/home-help-page/home-help-page.component';
import { Route, RouterModule } from '@angular/router';
import { MainHelpComponent } from './components/main-help/main-help.component';

const routes: Route[] = [
  {
    path: '',
    component: MainHelpComponent,
    data: {
      breadcrumb: BreadcrumbLabel.HOME_HELP,
      pageTitle: BreadcrumbLabel.HOME_HELP,
    },
    children: [
      {
        path: '',
        component: HomeHelpPageComponent,
        data: {
          breadcrumb: '',
          pageTitle: BreadcrumbLabel.HOME_HELP,
        },
      },
      {
        path: 'help-page/:servicePage',
        component: HelpPageComponent,
        data: {
          breadcrumb: BreadcrumbLabel.VIEW_HELP,
          pageTitle: BreadcrumbLabel.VIEW_HELP,
        },
      },
    ]
  },
];

@NgModule({
  declarations: [HelpPageComponent,HomeHelpPageComponent,MainHelpComponent],
  imports: [
    CommonModule,
    SharedLibModule,
     RouterModule.forChild(routes)
]
})
export class HelpPageModule { }
