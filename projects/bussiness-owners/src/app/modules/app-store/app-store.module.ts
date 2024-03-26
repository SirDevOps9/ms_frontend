import { AuthGuard } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { ListAppsComponent } from './pages/list-apps/list-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { HttpClientModule } from '@angular/common/http';
import { SelectSubdomainComponent } from './components/select-subdomain.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';

const routes: Routes = [
  {
    path: 'app-store',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListAppsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.APP_STORE,
        },
      },
    ]
  }
]

@NgModule({
  declarations: [
    ListAppsComponent,
    SelectSubdomainComponent,
    AppDetailsComponent
  ],
  imports: [
    SharedLibModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class AppStoreModule { }
