import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { UsersComponent } from './pages/user-list/users.component';
import { UserconfirmationComponent } from './pages/inviteduserconfirmation/userconfirmation.component';
import { UserInviteFormComponent } from './components/invite-form/user-invite-form.component';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BreadcrumbLabel, RouterService, SharedLibModule } from 'shared-lib';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users/:id',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.USERS,
        },
      },
      // {
      //   path: 'users/bouserdetails/:id',
      //   component: bouserdetails,
      //   canActivate: [AuthGuard],
      // },
    ],
  },
];

@NgModule({
  providers: [RouterService],
  declarations: [
    UsersComponent,
    UserconfirmationComponent,
    UserDetailsComponent,
    UserInviteFormComponent,
  ],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [],
})
export class UserModule {}
