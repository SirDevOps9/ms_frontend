import { LayoutPageComponent } from 'apps-shared-lib';
import { AuthGuard } from 'microtec-auth-lib';

export const ERPRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/journal-entry/journal-entry.module').then(
            (m) => m.JournalEntryModule
          )
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./modules/account/account.module').then(
            (m) => m.AccountModule
          )
      }
    ],
  },
];
