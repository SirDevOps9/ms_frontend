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
          ),
      },
    ],
  },
];
