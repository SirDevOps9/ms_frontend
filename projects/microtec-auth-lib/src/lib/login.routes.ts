import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutRedirectComponent } from './pages/logout-redirect/logout-redirect.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const loginRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
  },
  { path: 'logout-redirect', component: LogoutRedirectComponent },
];
