import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from 'microtec-auth-lib';
import { LayoutPageComponent } from 'apps-shared-lib';


export const ERPRoutes = [
  {
    path: '',
   // canActivate: [AuthGuard],
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/employee/employee.module').then(
            (m) => m.EmployeeModule
          )
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
