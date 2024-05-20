import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbLabel, RouterService, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EMPLOYEE,
        },
      },
      {
        path: 'employee/add',
        component: CreateEmployeeComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EMPLOYEE_ADD,
        },
      },
      {
        path: 'employee/view',
        component: ViewEmployeeComponent,
        //canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EMPLOYEE_ADD,
        },
      },
    ],
  },
];

@NgModule({
  providers: [RouterService],
  declarations: [EmployeeListComponent, CreateEmployeeComponent],
  imports: [
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class EmployeeModule {}
