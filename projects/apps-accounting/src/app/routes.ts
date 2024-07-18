import { LandingPageComponent, LayoutPageComponent } from 'apps-shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { Modules } from 'shared-lib';

export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'transcations',
        loadChildren: () =>
          import('./modules/journal-entry/journal-entry.module').then((m) => m.JournalEntryModule),
      },
      {
        path: 'masterdata',
        loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
];
