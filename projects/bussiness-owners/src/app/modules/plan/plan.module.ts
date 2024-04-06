import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { MyPlansComponent } from './pages/my-plans/my-plans.component';
import { PlanComponent } from './pages/plan-list/plan.component';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';

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
    ],
  },
];

@NgModule({
  providers: [],
  declarations: [PlanComponent, MyPlansComponent, AddDomainSpaceComponent],
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
