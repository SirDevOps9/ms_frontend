import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutRedirectComponent } from './pages/logout-redirect/logout-redirect.component';

export const loginRoutes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
  },
  { path: 'logout-redirect', component: LogoutRedirectComponent },
];
