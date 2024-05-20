import { LayoutComponent } from './modules/layout/layout-page/layout.component';
import { UserconfirmationComponent } from './modules/user/pages/inviteduserconfirmation/userconfirmation.component';
import { AuthGuard } from 'microtec-auth-lib';
import { MySubscriptionsComponent } from './modules/subscription/pages/my-subscriptions/my-subscriptions.component';
import { BreadcrumbLabel } from 'shared-lib';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MySubscriptionsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.my_subscription,
        },
      },
    ],
  },
  { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
