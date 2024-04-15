import { LayoutComponent } from './modules/layout/layout-page/layout.component';
import { UserconfirmationComponent } from './modules/user/pages/inviteduserconfirmation/userconfirmation.component';
import { AuthGuard } from '../../../microtec-auth-lib/src/public-api';
import { MySubscriptionsComponent } from './modules/subscription/pages/my-subscriptions/my-subscriptions.component';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MySubscriptionsComponent, canActivate: [AuthGuard] },
    ],
  },
 { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
