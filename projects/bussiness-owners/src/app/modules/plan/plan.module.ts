import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { PlanComponent } from './pages/plan-list/plan.component';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { SubdomainDetailsComponent } from './components/subdomain-details/subdomain-details.component';

const routes: Routes = [
  {
    path:'',
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
        path: 'subdomain-details',
        component: SubdomainDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.DOMAIN,
        },
      },
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [PlanComponent, MyPlansComponent ,SubdomainDetailsComponent],
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
