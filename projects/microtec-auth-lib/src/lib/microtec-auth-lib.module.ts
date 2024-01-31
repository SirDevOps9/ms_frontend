import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { LogoutRedirectComponent } from './pages/logout-redirect/logout-redirect.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { loginRoutes } from './login.routes';

@NgModule({
  declarations: [
    LoginComponent,
    LoginRedirectComponent,
    LogoutRedirectComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(loginRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    TranslateModule.forRoot(),
  ],
  exports: [],
})
export class MicrotecAuthLibModule {}
