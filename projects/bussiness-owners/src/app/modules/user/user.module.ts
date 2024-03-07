import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { UsersComponent } from './pages/user-list/users.component';
import { bouserdetails } from './components/bouserdetails/bouserdetails.component';
import { UserconfirmationComponent } from './pages/inviteduserconfirmation/userconfirmation.component';

const routes: Routes = [
  {
    path: 'users/:id',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: BreadcrumbLabel.USERS,
    },
  },
  {
    path: 'users/bouserdetails/:id',
    component: bouserdetails,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  providers: [],
  declarations: [UsersComponent, UserconfirmationComponent, bouserdetails],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [],
})
export class UserModule {}
