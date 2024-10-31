import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import {SubscriptionComponent } from './pages/subscription-list/subscription.component';
//import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';
import { ManageAppsComponent } from './pages/manage-apps/manage-apps.component';
import { LayoutModule } from '../layout/layout.module';
import { BreadCrumbRoute } from '../../models';
import { ListWorkflowComponent } from './pages/main-workflow/list-workflow/list-workflow.component';
import { AddWorkflowComponent } from './components/workflow-comp/add-workflow/add-workflow.component';
import { EditWorkflowComponent } from './components/workflow-comp/edit-workflow/edit-workflow.component';
import { ViewWorkflowComponent } from './pages/main-workflow/view-workflow/view-workflow.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-subscriptions',
        pathMatch: 'full',
       
      },
      {
        path: 'my-subscriptions',
        component: MySubscriptionsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadCrumbRoute.subscription
        },
      },
      {
        path: 'manage-apps/:id',
        component: ManageAppsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadCrumbRoute.app
        },
      },
      {
        path: 'workflow',
        component: ListWorkflowComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadCrumbRoute.app
        },
      },
      {
        path: 'workflow/:id',
        component: ViewWorkflowComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadCrumbRoute.app
        },
      }
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [SubscriptionComponent, MySubscriptionsComponent, AddDomainSpaceComponent ,ManageAppsComponent, ListWorkflowComponent, AddWorkflowComponent, EditWorkflowComponent, ViewWorkflowComponent],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(routes),
  ],
  exports: [],
})
export class SubscriptionModule {}
