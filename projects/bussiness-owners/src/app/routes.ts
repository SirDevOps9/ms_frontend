import { LayoutComponent } from './modules/layout/layout-page/layout.component';
import { UserconfirmationComponent } from './modules/user/pages/inviteduserconfirmation/userconfirmation.component';
import { AuthGuard } from '../../../microtec-auth-lib/src/public-api';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyPlansComponent } from './modules/plan/pages/my-plans/my-plans.component';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MyPlansComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
