import { LayoutPageComponent } from 'apps-shared-lib';

export const ERPRoutes = [
  {
    path: '',
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
