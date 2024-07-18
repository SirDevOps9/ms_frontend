import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
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
        component: LandingPageComponent,
      },
      {
        path: 'masterdata',
        loadChildren: () =>
          import('./modules/general-setting/general-setting.module').then(
            (m) => m.GeneralSettingModule
          ),
      },
    ],
  },
];
