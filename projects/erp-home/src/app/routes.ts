import { LayoutPageComponent } from 'apps-shared-lib';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'microtec-auth-lib';
import { TagListComponent } from './general-setting/pages/tag-list/tag-list.component';
import { TagAddComponent } from './general-setting/pages/tag-add/tag-add.component';

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
      {
        path: 'generalsettings',
        loadChildren: () =>
          import('./general-setting/general-setting.module').then((m) => m.GeneralSettingModule),
      },
      {
        path: 'tags',
        component: TagListComponent,
      },
    ],
  },
];
