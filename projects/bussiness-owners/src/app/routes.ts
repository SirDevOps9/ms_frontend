import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddCompanyComponent } from './pages/company/add-compny/add-compny.component';
import { UserconfirmationComponent } from './pages/inviteduserconfirmation/userconfirmation.component';
import { CompanyComponent } from './pages/company/company.component';
import { AuthGuard } from '../../../microtec-auth-lib/src/public-api';
import { bouserdetails } from './components/userscomps/bouserdetails/bouserdetails.component';
import { PlanComponent } from './pages/Plan/Plan.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewCompanyComponent } from './pages/company/new-company/new-company.component';
import { EditCompanyComponent } from './pages/company/edit-company/edit-company.component';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { BreadcrumbLabel } from '../../../shared-lib/src/lib/constants/index';

export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: MyPlansComponent, canActivate: [AuthGuard] },
      {
        path: 'users/:id',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.USERS,
        },
      },
      {
        path: 'company/new/:id',
        component: NewCompanyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company/add/:id',
        component: AddCompanyComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ADD_COMPANY,
        },
      },
      {
        path: 'company/:id',
        component: CompanyComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.COMPANY_LIST,
        },
      },
      {
        path: 'company/edit/:id',
        component: EditCompanyComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'users/bouserdetails/:id',
        component: bouserdetails,
        canActivate: [AuthGuard],
      },
      {
        path: 'plan',
        component: PlanComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.PLAN,
        },
      },
      {
        path: 'my-plans',
        component: MyPlansComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.MY_PLAN,
        },
      },
    ],
  },
  { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
