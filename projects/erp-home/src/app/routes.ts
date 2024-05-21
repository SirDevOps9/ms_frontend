import { LayoutPageComponent } from 'apps-shared-lib';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'microtec-auth-lib';
import { Modules } from 'shared-lib';

export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.GeneralSettings,
    },
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
];
