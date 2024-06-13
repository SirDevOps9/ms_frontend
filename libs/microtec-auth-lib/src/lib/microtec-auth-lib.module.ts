import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { LoginRedirectComponent } from './pages/login-redirect/login-redirect.component';
import { LogoutRedirectComponent } from './pages/logout-redirect/logout-redirect.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { loginRoutes } from './login.routes';
import { HasPermissionDirective } from './directives/hasPermission.directive';
import { UnAuthorizedComponent } from './pages/un-authorized/un-authorized.component';

@NgModule({
  declarations: [
    HasPermissionDirective,
    LoginComponent,
    LoginRedirectComponent,
    LogoutRedirectComponent,
    UnAuthorizedComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatPaginatorModule,
    TranslateModule,
    RouterModule.forChild(loginRoutes),
  ],
  exports: [HasPermissionDirective],
})
export class MicrotecAuthLibModule {}
