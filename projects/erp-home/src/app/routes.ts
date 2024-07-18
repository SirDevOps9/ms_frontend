import { LayoutPageComponent } from 'apps-shared-lib';
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
        loadChildren: () =>
          import('./modules/general-setting/general-setting.module').then(
            (m) => m.GeneralSettingModule
          ),
      },
      {
        path: 'generalsettings',
        loadChildren: () =>
          import('./modules/general-setting/general-setting.module').then(
            (m) => m.GeneralSettingModule
          ),
      },
    ],
  },
];
