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
         data: { breadcrumb: 'user' },
        component: UsersComponent,
        canActivate: [AuthGuard],
        children:[
          {
            path: 'users/bouserdetails/:id',
            component: bouserdetails,
            canActivate: [AuthGuard], 
            data: {
              breadcrumb: 'user edite'
            },
          },
        ]
      },
      {
        path: 'company/add/:id',
        data: { breadcrumb: 'company add' },
        component: AddCompanyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company/:id',
        
        data: { breadcrumb: 'company ' },
        component: CompanyComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'users/bouserdetails/:id',
      //   component: bouserdetails,
      //   canActivate: [AuthGuard], 
      //   data: {
      //     breadcrumb: 'Europe'
      //   },
      // },
      {
       path: 'plan',
       data: { breadcrumb: 'plan' },
        component: PlanComponent, 
       canActivate: [AuthGuard],
       children:[
        {
          path: 'users/:id',
           data: { breadcrumb: 'user' },
          component: UsersComponent,
          canActivate: [AuthGuard],
          children:[
            {
              path: 'users/bouserdetails/:id',
              component: bouserdetails,
              canActivate: [AuthGuard], 
              data: {
                breadcrumb: 'user edite'
              },
            },
          ]
        },
       ]
      },
    ]
  },
  { path: 'users/userconfirmation/:id', component: UserconfirmationComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
