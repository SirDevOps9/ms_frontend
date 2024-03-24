import { AuthGuard } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppsComponent } from './pages/list-apps/list-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'app-store',
        component: ListAppsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.APP_STORE,
        },
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListAppsComponent
  ],
  imports: [
    SharedLibModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class AppStoreModule { }
