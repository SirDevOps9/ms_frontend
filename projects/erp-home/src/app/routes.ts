import { LayoutPageComponent } from 'apps-shared-lib';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'microtec-auth-lib';
import { TagListComponent } from './general-setting/pages/tag-list/tag-list.component';
import { Modules } from 'shared-lib';
import { TagAddComponent } from './general-setting/pages/tag-add/tag-add.component';

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
          import('./general-setting/general-setting.module').then((m) => m.GeneralSettingModule),
      },
      {
        path: 'generalsettings',
        loadChildren: () =>
          import('./general-setting/general-setting.module').then((m) => m.GeneralSettingModule),
      },
    ],
  },
];
