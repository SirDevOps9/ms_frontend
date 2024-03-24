import { AuthGuard } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppsComponent } from './pages/list-apps/list-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { HttpClientModule } from '@angular/common/http';
import { CardAppsComponent } from './pages/card-apps/card-apps.component';
import { SelectSubdomainComponent } from './components/select-subdomain.component';

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
      {
        path: 'cards',
        component: CardAppsComponent,
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
    ListAppsComponent,
    CardAppsComponent,
    SelectSubdomainComponent
  ],
  imports: [
    SharedLibModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class AppStoreModule { }
