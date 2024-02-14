import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddCompanyComponent } from './pages/company/add-compny/add-compny.component';
import { CompanyComponent } from './pages/company/company.component';
import { AuthGuard } from '../../../microtec-auth-lib/src/public-api';
import { InviteCurrentUserComponent } from './pages/invite-current-user/invite-current-user.component';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'company/add', component: AddCompanyComponent, canActivate: [AuthGuard] },
      { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
      { path: 'invitecurrentuser', component: InviteCurrentUserComponent, canActivate: [AuthGuard] },

    ],
  },

];
