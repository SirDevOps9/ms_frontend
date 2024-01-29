import { AuthGuard } from '../../../shared-lib/src/lib/guards/auth.guard';
import { sharedRoutes } from '../../../shared-lib/src/lib/shared.routes';
import { AppComponent } from './app.component';
import { LayoutComponent } from './compnents/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';

export const BORoutes = [
  ...sharedRoutes,
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UsersComponent, canActivate: [AuthGuard] },
    ],
  },
];
