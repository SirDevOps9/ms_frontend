import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { PlanComponent } from './pages/plan-list/plan.component';

const routes: Routes = [
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
];

@NgModule({
  providers: [],
  declarations: [PlanComponent, MyPlansComponent],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [],
})
export class PlanModule {}
