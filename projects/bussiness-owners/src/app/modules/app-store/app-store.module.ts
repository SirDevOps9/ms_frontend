import { AuthGuard, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { NgModule } from '@angular/core';
import { ListAppsComponent } from './pages/list-apps/list-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout-page/layout.component';
import { BreadcrumbLabel, RouterService, SharedLibModule } from 'shared-lib';
import { HttpClientModule } from '@angular/common/http';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemDetailComponent } from './pages/cart-item-detail/cart-item-detail.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PaymentSuccesfulComponent } from './pages/payment-succesful/payment-succesful.component';
import { BreadCrumbRoute } from '../../models';

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
          breadcrumb: BreadCrumbRoute.appStore
        },
      },
      {
        path: 'app-detail/:id',
        component: AppDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadCrumbRoute.appDetails
        },
      },
      {
        path: 'cart',
        component: CartComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb:  BreadCrumbRoute.cart
        },
      },
      {
        path: 'paymentSuccesful',
        component: PaymentSuccesfulComponent,
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
    AppDetailsComponent,
    CartComponent,
    CartItemDetailComponent,
    MainPageComponent,
    PaymentSuccesfulComponent,
  ],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [RouterService],
})
export class AppStoreModule {}
