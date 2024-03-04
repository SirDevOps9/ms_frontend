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
          breadcrumb: 'user list'
        },
      },
      {
        path: 'company/add/:id',
        component: AddCompanyComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'company add'
        },
      },
      {
        path: 'company/:id',
        component: CompanyComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'company list'
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
        breadcrumb: 'plan'
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
