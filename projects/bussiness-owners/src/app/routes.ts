import { AuthGuard } from 'microtec-auth-lib';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CompanyComponent } from './pages/company/company.component';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'company',
    component: CompanyComponent,
  },
];
