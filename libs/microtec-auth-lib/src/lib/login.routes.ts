import {
  LoginComponent,
  LoginRedirectComponent,
  LogoutComponent,
  LogoutRedirectComponent,
  Routes,
  UnAuthorizedComponent,
} from './pages';

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
