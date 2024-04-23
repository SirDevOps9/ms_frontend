import { BreadcrumbLabel } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { LayoutPageComponent } from './modules/layout/layout-page/layout-page.component';

AuthGuard
export const ERPRoutes = [
  {
    path: 'erp',
    component: LayoutPageComponent,
    children: [
      { path: '', component: LayoutPageComponent, canActivate: [AuthGuard], data: {
        breadcrumb: BreadcrumbLabel.my_subscription,
      }, },
    ],
  },

];
