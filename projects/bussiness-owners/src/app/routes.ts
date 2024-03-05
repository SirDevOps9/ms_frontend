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
import { BreadcrumbLabel } from '../../../shared-lib/src/lib/constants/index';


export const BORoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'users/:id',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.USERS,
        },
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
          breadcrumb: BreadcrumbLabel.COMPANE_LIST,
        },
      },
      {
        path: 'users/bouserdetails/:id',
        component: bouserdetails,
        canActivate: [AuthGuard],
      },
      { path: 'plan', component: PlanComponent, 
      canActivate: [AuthGuard] ,
       data: {
        breadcrumb: BreadcrumbLabel.PLAN,
      }
    },
    ],
  },
  { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
