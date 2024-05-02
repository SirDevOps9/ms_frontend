import { Routes } from '@angular/router';
import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutRedirectComponent } from './pages/logout-redirect/logout-redirect.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UnAuthorizedComponent } from './pages/un-authorized/un-authorized.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent,
  },
  { path: 'logout-redirect', component: LogoutRedirectComponent },
  { path: 'un-authorized', component: UnAuthorizedComponent },
];
