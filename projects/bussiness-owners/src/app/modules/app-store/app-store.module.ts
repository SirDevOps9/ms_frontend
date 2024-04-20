import { Apps, AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { ListAppsComponent } from './pages/list-apps/list-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { HttpClientModule } from '@angular/common/http';
import { SelectSubdomainComponent } from './components/select-subdomain.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemDetailComponent } from './pages/cart-item-detail/cart-item-detail.component';
import { Actions, Licenses, RouteFilter } from 'microtec-auth-lib';

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
          // filter: {
          //   Action: Actions.Update,
          //   License: Licenses.Advanced,
          //   App: Apps.Hr,
          // } as RouteFilter,
          //action: Actions.Update,
        },
      },
      // {
      //   path: 'cards',
      //   component: CardAppsComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     breadcrumb: BreadcrumbLabel.APP_STORE,
      //   },
      // },
      {
        path: 'cart',
        component: CartComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CART,
        },
      },
      {
        path: 'cartItemDetail/:id',
        component: CartItemDetailComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CART,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ListAppsComponent,
    SelectSubdomainComponent,
    AppDetailsComponent,
    CartComponent,
    CartItemDetailComponent,
  ],
  imports: [
    SharedLibModule,
    MicrotecAuthLibModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class AppStoreModule {}
