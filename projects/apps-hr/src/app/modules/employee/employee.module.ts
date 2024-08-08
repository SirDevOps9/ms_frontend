import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbLabel, Modules, RouterService, SharedLibModule } from 'shared-lib';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { MainEmployeeComponent } from './pages/main-employee/main-employee.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.Hr,
    },
    children: [
      {
        path: 'employee',
        component: MainEmployeeComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.EMPLOYEE,
        },
        children: [
          {
            path: '',
            component: EmployeeListComponent,
            //canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },

          {
            path: 'add',
            component: CreateEmployeeComponent,
            //canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EMPLOYEE_ADD,
            },
          },
          {
            path: 'view/:id',
            component: ViewEmployeeComponent,
            //canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EMPLOYEE_VIEW,
            },
          },
          {
            path: 'edit/:id',
            component: EditEmployeeComponent,
            //canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.EMPLOYEE_EDIT,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  providers: [RouterService],
  declarations: [
    EmployeeListComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent,
    MainEmployeeComponent,
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
  exports: [],
})
export class EmployeeModule {}
