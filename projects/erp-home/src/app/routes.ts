import { LayoutPageComponent } from 'apps-shared-lib';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'microtec-auth-lib';

export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
];
