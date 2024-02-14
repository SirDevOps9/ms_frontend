import { AuthGuard } from 'microtec-auth-lib';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddCompanyComponent } from './pages/company/add-compny/add-compny.component';
import { UserconfirmationComponent } from './pages/userconfirmation/userconfirmation.component';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'company/add', component: AddCompanyComponent, canActivate: [AuthGuard] },
      { path: 'users/userconfirmation/:id', component: UserconfirmationComponent, canActivate: [AuthGuard] },
    ],
  },
];
