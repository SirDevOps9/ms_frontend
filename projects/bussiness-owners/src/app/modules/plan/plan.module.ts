import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { PlanComponent } from './pages/plan-list/plan.component';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSubdomainComponent } from './pages/add-subdomain/add-subdomain.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      {
        path: 'add-subdomain',
        component: MyPlansComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.MY_PLAN,
        },
      },
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [PlanComponent, MyPlansComponent, AddSubdomainComponent],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(routes),
  ],
  exports: [],
})
export class PlanModule {}
