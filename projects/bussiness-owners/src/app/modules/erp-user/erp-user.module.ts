import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, RouterService, SharedLibModule } from 'shared-lib';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { ERPUserComponent } from './pages/erp-user-list/erp-users.component';
import { InvitedErpUserComponent } from './components/invited-erp-user/invited-erp-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'erpusers/:id',
        component: ERPUserComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.ERP_USERS,
        },
      }
    ],
  },
];

@NgModule({
  providers: [RouterService],
  declarations: [
    ERPUserComponent,
    InvitedErpUserComponent
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
export class ERPUserModule {}
