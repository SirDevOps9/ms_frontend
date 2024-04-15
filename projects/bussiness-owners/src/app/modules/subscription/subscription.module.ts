import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import {SubscriptionComponent } from './pages/subscription-list/subscription.component';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'subscription',
        component: SubscriptionComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.SUBSCRIPTION,
        },
      },
      {
        path: 'my-subscriptions',
        component: MySubscriptionsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.MY_SUBSCRIPTION,
        },
      },
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [SubscriptionComponent, MySubscriptionsComponent, AddDomainSpaceComponent],
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
